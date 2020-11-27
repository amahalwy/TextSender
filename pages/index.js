import { Form, Field } from "react-final-form";
import { useTimeoutFn, useAsyncFn } from "react-use";
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Heading,
  Box,
  Button,
  VStack,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Select,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import PhoneNumber from "awesome-phonenumber";

const fetchNumbers = (values) => {
  // return fetch("http://localhost:3000/api/TwilNumbers/TwilioNumbers", {
  return fetch("https://text-sender.vercel.app/api/TwilNumbers/TwilioNumbers", {
    method: "POST",
    body: JSON.stringify(values),
  }).then((res) => res.json());
};

const validatePhoneNumbers = (value) => {
  if (!value) {
    return undefined;
  }

  const invalidNumbers = [];
  const numbers = value.split(",").map((number) => number.trim());

  numbers.forEach((number) => {
    const pnCa = PhoneNumber(number, "CA");
    const pnUs = PhoneNumber(number, "US");

    if (!pnCa.isValid() || !pnUs.isValid()) {
      invalidNumbers.push(number);
    }
  });

  if (invalidNumbers.length) {
    return invalidNumbers
      .map((number) => `${number} is an invalid CA/US number.`)
      .join("\n");
  }

  return undefined;
};

const validateRequired = (value) => {
  if (!value) {
    return "Required";
  }

  return undefined;
};

// Function to create the bottom of the page (after clicking find numbers)
const BottomSection = ({
  submitting,
  pristine,
  form,
  values,
  setShow,
  numbers,
  invalid,
}) => {
  return (
    <Box>
      <Field
        name="from"
        validate={validateRequired}
        render={({ input, meta }) => (
          <FormControl isInvalid={meta.touched && meta.error}>
            <FormLabel htmlFor="from">Twilio phone number</FormLabel>
            <Select {...input} id="from" placeholder="Phone Number">
              <option value={undefined} />
              {numbers.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </Select>
            {meta.touched && meta.error && (
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            )}
          </FormControl>
        )}
      />

      <Field name="message" validate={validateRequired}>
        {({ input, meta }) => (
          <FormControl isInvalid={meta.touched && meta.error}>
            <FormLabel mt="10px" htmlFor="message">
              Message
            </FormLabel>
            <Textarea {...input} id="message" placeholder="Type here..." />
            {meta.touched && meta.error && (
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            )}
          </FormControl>
        )}
      </Field>

      <Field
        name="numbers"
        validate={(value) =>
          validateRequired(value) || validatePhoneNumbers(value)
        }
        render={({ input, meta }) => (
          <FormControl isInvalid={meta.touched && meta.error}>
            <FormLabel htmlFor="phoneNumbers">Phone numbers</FormLabel>
            <Textarea
              {...input}
              id="phoneNumbers"
              placeholder="Phone numbers"
            />
            {meta.touched && meta.error && (
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            )}
          </FormControl>
        )}
      />

      <Stack direction="row" mt="24px">
        <Button
          type="submit"
          disabled={submitting || pristine || invalid}
          colorScheme="teal"
        >
          Submit
        </Button>

        <Button
          type="reset"
          onClick={() => {
            setShow(false);
            form.reset();
          }}
          disabled={submitting || pristine}
        >
          Reset form
        </Button>
      </Stack>
    </Box>
  );
};

const NumberSendRow = ({ data }) => {
  const [state, fetchRequest] = useAsyncFn(() => {
    // return fetch("http://localhost:3000/api/SendSMS/CreateSMS", {
    return fetch("https://text-sender.vercel.app/api/SendSMS/CreateSMS", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }, [data]);
  const callFn = () => {
    if (!state.loading) {
      return fetchRequest();
    }
  };
  const [isReady, cancel, reset] = useTimeoutFn(callFn, data.timeToSend);

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      {(!isReady() || state.loading) && <Spinner />}{" "}
      {!(!isReady() || state.loading) && state?.value?.error_code ? (
        <CloseIcon />
      ) : (
        <CheckIcon />
      )}{" "}
      {data.to}
    </Box>
  );
};

export default function MyForm() {
  const [show, setShow] = React.useState(false);
  const [numbers, setNumbers] = React.useState([]);
  const [formData, setFormData] = React.useState([]);

  const findNumbers = (values) => {
    fetchNumbers(values).then((numbersFromTwillio) => {
      setNumbers(numbersFromTwillio);
      setShow(true);
    });
  };

  const onSubmit = (values) => {
    const { sid, token, message, from } = values;
    const data = {
      sid,
      token,
      message,
      from,
    };

    const newArr = values.numbers.split(",").map((number, index) => ({
      ...data,
      to: number.trim(),
      timeToSend: Math.random() * (1000 * (index + 1)),
    }));

    setFormData(newArr);
  };

  return (
    <Box h="100%" w="100%" m="auto">
      <Box bg="white" p={5} shadow="md" borderWidth="1px" m="2% auto" w="26%">
        <Form
          onSubmit={onSubmit}
          // validate={validate}
          render={({
            handleSubmit,
            form,
            submitting,
            pristine,
            values,
            invalid,
          }) => (
            <form onSubmit={handleSubmit} style={{ margin: "20px auto" }}>
              <Box mb="24px">
                <Heading>Send your text</Heading>
                <p>Please add your credentials for twilio below</p>
              </Box>
              <Field
                name="accountSid"
                validate={validateRequired}
                render={({ input, meta }) => (
                  <FormControl isInvalid={meta.touched && meta.error}>
                    <FormLabel htmlFor="sid">Account SID</FormLabel>
                    <Input {...input} id="sid" placeholder="Account SID" />
                    {meta.touched && meta.error && (
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    )}
                  </FormControl>
                )}
              />
              <Field
                name="apiKey"
                validate={validateRequired}
                render={({ input, meta }) => (
                  <FormControl mt="10px" isInvalid={meta.touched && meta.error}>
                    <FormLabel htmlFor="api-key">API Key</FormLabel>
                    <Input {...input} id="api-key" placeholder="API Key" />
                    {meta.touched && meta.error && (
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    )}
                  </FormControl>
                )}
              />{" "}
              <Field
                name="apiSecret"
                validate={validateRequired}
                render={({ input, meta }) => (
                  <FormControl mt="10px" isInvalid={meta.touched && meta.error}>
                    <FormLabel htmlFor="api-secret">API Key Secret</FormLabel>
                    <Input
                      {...input}
                      id="api-secret"
                      placeholder="API Key Secret"
                    />
                    {meta.touched && meta.error && (
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    )}
                  </FormControl>
                )}
              />{" "}
              <Box mt={"24px"}>
                <Button
                  type="button"
                  m="0 28%"
                  disabled={submitting || pristine}
                  onClick={() => {
                    findNumbers(values);
                  }}
                >
                  Find number(s)
                </Button>
              </Box>
              {show && (
                <Box mt="24px">
                  <BottomSection
                    submitting={submitting}
                    pristine={pristine}
                    form={form}
                    values={values}
                    invalid={invalid}
                    numbers={numbers}
                    setShow={setShow}
                  />
                </Box>
              )}
            </form>
          )}
        />
        <VStack spacing={4} align="stretch">
          {formData.map((data) => (
            <NumberSendRow key={data.to} data={data} />
          ))}
        </VStack>
      </Box>
    </Box>
  );
}
