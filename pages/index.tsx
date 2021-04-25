import React from "react";
import { Form } from "react-final-form";
import { Heading, Box, VStack, Text } from "@chakra-ui/react";
import NumberSendRow from "../components/NumberSendRow";
import BottomSection from "../components/BottomSection";
import FormSection from "../components/FormSection";
import GoogleAnalytics from "../components/GoogleAnalytics";
import publishMessage from "./api/slack/SendSlackMsg";
import { IValues, IReceiver } from "../typescript/interfaces";

const MyForm: React.FC = () => {
  const [numbers, setNumbers] = React.useState<string[]>([]);
  const [formData, setFormData] = React.useState<IReceiver[]>([]);
  const [showBottom, setShowBottom] = React.useState<boolean>(false);
  const [loadingNumbers, setLoadingNumbers] = React.useState<boolean>(false);
  const [showTwilioSection, setShowTwilioSection] = React.useState<boolean>(
    true
  );
  const [failedTexts, setFailedTexts] = React.useState<number>(0);
  const [successfulTexts, setSuccessfulTexts] = React.useState<number>(0);

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

    publishMessage();
    setFormData(newArr);
  };

  return (
    <Box
      h="100%"
      w={{ base: "80%", lg: "100%" }}
      m={{ base: "6% auto", lg: "auto" }}
      as="main"
    >
      <GoogleAnalytics />
      <Box
        p={5}
        bg="white"
        m="2% auto"
        shadow="md"
        as="section"
        borderRadius="lg"
        borderWidth="1px"
        w={{ base: "100%", md: "80%", lg: "36%", xl: "26%" }}
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
            <form
              onSubmit={handleSubmit}
              style={{ margin: "0 auto", padding: "10px 0" }}
            >
              <Box mb="24px" as="header">
                <Heading>Send your text</Heading>
                <Text>Please add your credentials for twilio below</Text>
              </Box>
              {showTwilioSection && (
                <FormSection
                  values={values}
                  submitting={submitting}
                  pristine={pristine}
                  invalid={invalid}
                  loadingNumbers={loadingNumbers}
                  setNumbers={setNumbers}
                  setShowBottom={setShowBottom}
                  setLoadingNumbers={setLoadingNumbers}
                  setShowTwilioSection={setShowTwilioSection}
                />
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

        {formData.length > 0 && (
          <Box as="footer">
            <Box d="flex" justifyContent="space-between" mb="6px">
              <Box>
                <Text fontStyle="italic" d="inline" color="rgb(0,200,0)">
                  Successful: {""}
                </Text>
                <Text d="inline">{successfulTexts}</Text>
              </Box>
              <Box>
                <Text fontStyle="italic" d="inline" color="rgb(200,0,0)">
                  Failed: {""}
                </Text>
                <Text d="inline">{failedTexts}</Text>
              </Box>
            </Box>

            <VStack spacing={4} align="stretch">
              {formData.map((data, i) => (
                <NumberSendRow
                  key={i}
                  data={data}
                  failedTexts={failedTexts}
                  successfulTexts={successfulTexts}
                  setFailedTexts={setFailedTexts}
                  setSuccessfulTexts={setSuccessfulTexts}
                />
              ))}
            </VStack>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MyForm;
