import React from "react";
import Head from "next/head";
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
      <Head>
        <title>Text-Sender</title>
        <meta
          name="description"
          content="A simple and easy application to send SMS through Twilio API."
        />
      </Head>
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
        <FormSection
          numbers={numbers}
          showBottom={showBottom}
          loadingNumbers={loadingNumbers}
          showTwilioSection={showTwilioSection}
          setNumbers={setNumbers}
          setFormData={setFormData}
          setShowBottom={setShowBottom}
          setLoadingNumbers={setLoadingNumbers}
          setShowTwilioSection={setShowTwilioSection}
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
              {formData.map((receiver: IReceiver, i: number) => (
                <NumberSendRow
                  key={i}
                  receiver={receiver}
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
