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
      <FormControl
        isInvalid={meta.touched && meta.error}
        data-testid="sid-control"
      >
        <FormLabel htmlFor="sid" data-testid="sid-label">
          Account SID
        </FormLabel>
        <Input
          {...input}
          id="sid"
          placeholder="Account SID"
          data-testid="sid-input"
        />
        {meta.touched && meta.error && (
          <FormErrorMessage data-testid="sid-error">
            {meta.error}
          </FormErrorMessage>
        )}
      </FormControl>
    )}
  />
);

export default Sid;
