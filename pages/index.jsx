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
import NumberSendRow from "../components/NumberSendRow";
import { publishMessage } from "./api/slack/SendSlackMsg";

const fetchNumbers = (values) => {
  // return fetch("http://localhost:3000/api/TwilNumbers/TwilioNumbers", {
  return fetch("https://text-sender.vercel.app/api/TwilNumbers/TwilioNumbers", {
    method: "POST",
    body: JSON.stringify(values),
  }).then((res) => res.json());
};

const validateRequired = (value) => {
  if (!value) {
    return "Required";
  }

  return undefined;
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
    const { accountSid, apiKey, apiSecret, message, from } = values;
    console.log(values);
    const data = {
      accountSid,
      apiKey,
      apiSecret,
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
      <Box
        bg="white"
        p={5}
        shadow="md"
        borderWidth="1px"
        m="2% auto"
        w={["100%", "26%"]}
      >
        <Form
          onSubmit={onSubmit}
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
              <Box>
                <Button
                  onClick={() => {
                    publishMessage("Hello!!");
                  }}
                >
                  Slack Find Convo
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
