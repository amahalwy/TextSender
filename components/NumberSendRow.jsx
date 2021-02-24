import { useTimeoutFn, useAsyncFn } from "react-use";
import React from "react";
import { Box, Spinner } from "@chakra-ui/react";
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";

const SuccessfulText = ({
  addSuccess,
  setAddSuccess,
  successfulTexts,
  setSuccessfulTexts,
}) => {
  React.useEffect(() => {
    if (addSuccess) {
      setSuccessfulTexts(successfulTexts + 1);
      setAddSuccess(false);
    }
  }, []);

  return <CheckIcon />;
};

const FailedText = ({
  addFailed,
  setAddFailed,
  failedTexts,
  setFailedTexts,
}) => {
  React.useEffect(() => {
    if (addFailed) {
      setFailedTexts(failedTexts + 1);
      setAddFailed(false);
    }
  }, []);
  return <CloseIcon />;
};

const NumberSendRow = ({
  data,
  failedTexts,
  successfulTexts,
  setFailedTexts,
  setSuccessfulTexts,
}) => {
  const [addSuccess, setAddSuccess] = React.useState(true);
  const [addFailed, setAddFailed] = React.useState(true);
  const [state, fetchRequest] = useAsyncFn(async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_SEND_SMS_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return await res.json();
  }, [data]);
  const callFn = () => {
    if (!state.loading) {
      return fetchRequest();
    }
  };
  const [isReady] = useTimeoutFn(callFn, data.timeToSend);

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Box d="flex" alignContent="center">
        <Box mr="4px">
          {!isReady() || state.loading ? (
            <Spinner />
          ) : !(!isReady() || state.loading) && state?.value?.error_code ? (
            <FailedText
              addFailed={addFailed}
              setAddFailed={setAddFailed}
              failedTexts={failedTexts}
              setFailedTexts={setFailedTexts}
            />
          ) : (
            <SuccessfulText
              addSuccess={addSuccess}
              setAddSuccess={setAddSuccess}
              successfulTexts={successfulTexts}
              setSuccessfulTexts={setSuccessfulTexts}
            />
          )}
        </Box>
        <Box>{data.to}</Box>
      </Box>
    </Box>
  );
};

export default NumberSendRow;
