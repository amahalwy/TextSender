import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";
import { Field } from "react-final-form";
import { validateRequired } from "../../utils/validations";

const Secret = () => (
  <Field
    name="apiSecret"
    validate={validateRequired}
    render={({ input, meta }) => (
      <FormControl mt="10px" isInvalid={meta.touched && meta.error}>
        <FormLabel htmlFor="api-secret">API Key Secret</FormLabel>
        <Input {...input} id="api-secret" placeholder="API Key Secret" />
        {meta.touched && meta.error && (
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        )}
      </FormControl>
    )}
  />
);

export default Secret;
