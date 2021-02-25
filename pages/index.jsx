import React from "react";
import { Form } from "react-final-form";
import { Heading, Box, VStack, Text } from "@chakra-ui/react";
import NumberSendRow from "../components/NumberSendRow";
import BottomSection from "../components/BottomSection";
import FormSection from "../components/FormSection";
import GoogleAnalytics from "../components/GoogleAnalytics";
import { publishMessage } from "./api/slack/SendSlackMsg";

const MyForm = () => {
  const [showBottom, setShowBottom] = React.useState(false);
  const [numbers, setNumbers] = React.useState([]);
  const [formData, setFormData] = React.useState([]);
  const [successfulTexts, setSuccessfulTexts] = React.useState(0);
  const [failedTexts, setFailedTexts] = React.useState(0);
  const [loadingNumbers, setLoadingNumbers] = React.useState(false);
  const [showTwilioSection, setShowTwilioSection] = React.useState(true);

  const onSubmit = (values) => {
    const { accountSid, apiKey, apiSecret, message, from } = values;
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

    publishMessage();
    setFormData(newArr);
  };

  return (
    <Box h="100%" w="100%" m="auto">
      <GoogleAnalytics />
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
              {showTwilioSection ? (
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
              ) : null}

              {showBottom && (
                <Box mt="24px">
                  <BottomSection
                    submitting={submitting}
                    pristine={pristine}
                    form={form}
                    values={values}
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
        {formData.length > 0 ? (
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
        ) : null}

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
    </Box>
  );
};

export default MyForm;
