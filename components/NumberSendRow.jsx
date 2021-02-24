import { useTimeoutFn, useAsyncFn } from "react-use";
import React from "react";
import { Box, Spinner } from "@chakra-ui/react";
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";

const NumberSendRow = ({ data }) => {
  const [state, fetchRequest] = useAsyncFn(async () => {
    // return fetch("http://localhost:3000/api/SendSMS/CreateSMS", {
    const res = await fetch(
      "https://text-sender.vercel.app/api/SendSMS/CreateSMS",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    return await res.json();
  }, [data]);
  const callFn = () => {
    if (!state.loading) {
      return fetchRequest();
    }
  };
  const [isReady, cancel, reset] = useTimeoutFn(callFn, data.timeToSend);

  setTimeout(() => {
    callFn;
  }, data.timeToSend);

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Box d="flex" alignContent="center">
        <Box mr="4px">
          {!isReady() || state.loading ? (
            <Spinner />
          ) : !(!isReady() || state.loading) && state?.value?.error_code ? (
            <CloseIcon />
          ) : (
            <CheckIcon />
          )}
        </Box>
        <Box>{data.to}</Box>
      </Box>
    </Box>
  );
};

export default NumberSendRow;
