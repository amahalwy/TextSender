import React from "react";
import { Box, Flex, Button, Heading, Text } from "@chakra-ui/react";
import {
  IFormSection,
  IReceiver,
  ISubmitSection,
  IValues,
} from "../typescript/interfaces";
import endpoints from "../config/endpoints";
import API from "./Form/API";
import Secret from "./Form/Secret";
import Sid from "./Form/Sid";
import { Form } from "react-final-form";
import BottomSection from "./BottomSection";
import publishMessage from "../pages/api/slack/SendSlackMsg";
import SubmitSection from "./Form/Submit";

export const fetchNumbers = async (values: IValues) => {
  const req = await fetch(endpoints.FindTwilioEndpoint, {
    method: "POST",
    body: JSON.stringify(values),
  });
  return req.json();
};

const FormSection: React.FC<IFormSection> = ({
  numbers,
  showBottom,
  loadingNumbers,
  showTwilioSection,
  setFormData,
  setNumbers,
  setShowBottom,
  setLoadingNumbers,
  setShowTwilioSection,
}) => {
  const findNumbers = (values: IValues) => {
    setLoadingNumbers(true);
    fetchNumbers(values).then((numbersFromTwillio) => {
      setNumbers(numbersFromTwillio);
      setShowTwilioSection(false);
      setShowBottom(true);
      setLoadingNumbers(false);
    });
  };

  const onSubmit = (values: IValues) => {
    const { accountSid, apiKey, apiSecret, message, from } = values;
    const data = {
      accountSid,
      apiKey,
      apiSecret,
      message,
      from,
    };

    const newArr: IReceiver[] = values.numbers
      .split(",")
      .map((number: string, index: number) => ({
        ...data,
        to: number.trim(),
        timeToSend: Math.random() * (1000 * (index + 1)),
      }));

    publishMessage(newArr.length);
    setFormData(newArr);
  };

  return (
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
        <form
          data-testid="test-form"
          onSubmit={handleSubmit}
          style={{ margin: "0 auto", padding: "10px 0" }}
        >
          <Box mb="24px" as="header">
            <Heading>Send your text</Heading>
            <Text>
              {!showBottom
                ? `Please add your credentials for twilio below`
                : "Select your number below and start sending!"}
            </Text>
          </Box>
          {showTwilioSection && (
            <Box as="section">
              <Sid />
              <API /> <Secret />{" "}
              <SubmitSection
                submitting={submitting}
                pristine={pristine}
                invalid={invalid}
                loadingNumbers={loadingNumbers}
                findNumbers={findNumbers}
                values={values}
              />
            </Box>
          )}
          {showBottom && (
            <Box mt="2%">
              <BottomSection
                submitting={submitting}
                pristine={pristine}
                form={form}
                invalid={invalid}
                numbers={numbers}
                setShowBottom={setShowBottom}
                setShowTwilioSection={setShowTwilioSection}
              />
            </Box>
          )}
        </form>
      )}
    />
  );
};

export default FormSection;
