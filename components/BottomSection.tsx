import { Field } from "react-final-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { validateRequired, validatePhoneNumbers } from "../utils/validations";
import { IBottomSection } from "../typescript/interfaces";

const BottomSection: React.FC<IBottomSection> = ({
  form,
  numbers,
  invalid,
  pristine,
  submitting,
  setShowBottom,
  setShowTwilioSection,
}) => (
  <Box>
    <Box mb="20px">
      <Text color="rgb(0,145,0)">
        Success! Select your twilio number and send out your awesome messages 🙌🏻
      </Text>
    </Box>
    <Field
      name="from"
      validate={validateRequired}
      render={({ input, meta }) => (
        <FormControl isInvalid={meta.touched && meta.error}>
          <FormLabel htmlFor="from">Twilio phone number</FormLabel>
          <Select
            {...input}
            id="from"
            placeholder="Phone Number"
            data-testid="select-bottom"
          >
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
            data-testid="numbers"
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
        Send
      </Button>
      <Button
        data-testid="bottom-reset"
        type="reset"
        onClick={() => {
          setShowBottom(false);
          setShowTwilioSection(true);
          form.reset();
        }}
        disabled={submitting || pristine}
      >
        Reset form
      </Button>
    </Stack>
  </Box>
);

export default BottomSection;
