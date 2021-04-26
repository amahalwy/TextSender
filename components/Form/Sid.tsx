import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";
import { Field } from "react-final-form";
import { validateRequired } from "../../utils/validations";

const Sid = () => (
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
);

export default Sid;
