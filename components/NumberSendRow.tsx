import { useTimeoutFn, useAsyncFn } from "react-use";
import React from "react";
import { Box, Spinner } from "@chakra-ui/react";
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import endpoints from "../config/endpoints";
import { IFailed, INumberSendRow, ISuccess } from "../typescript/interfaces";

export const SuccessfulText: React.FC<ISuccess> = ({
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

  return (
    <Box data-testid="success-box">
      <CheckIcon data-testid="check" />
    </Box>
  );
};

export const FailedText: React.FC<IFailed> = ({
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
  return (
    <Box data-testid="fail-box">
      <CloseIcon data-testid="close" />
    </Box>
  );
};

const NumberSendRow: React.FC<INumberSendRow> = ({
  receiver,
  failedTexts,
  successfulTexts,
  setFailedTexts,
  setSuccessfulTexts,
}) => {
  const [addSuccess, setAddSuccess] = React.useState(true);
  const [addFailed, setAddFailed] = React.useState(true);
  const [state, fetchRequest] = useAsyncFn(async () => {
    const res = await fetch(endpoints.SendSMS, {
      method: "POST",
      body: JSON.stringify(receiver),
    });
    return await res.json();
  }, [receiver]);
  const callFn = () => {
    if (!state.loading) {
      return fetchRequest();
    }
  };
  const [isReady] = useTimeoutFn(callFn, receiver.timeToSend);

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
        <Box>{receiver.to}</Box>
      </Box>
    </Box>
  );
};

export default NumberSendRow;
