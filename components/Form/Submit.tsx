import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { ISubmitSection } from "../../typescript/interfaces";

const Submit: React.FC<ISubmitSection> = ({
  submitting,
  pristine,
  invalid,
  loadingNumbers,
  findNumbers,
  values,
}) => (
  <Flex mt="6%" justifyContent="center">
    <Button
      type="button"
      disabled={submitting || pristine || invalid || loadingNumbers}
      isLoading={loadingNumbers}
      loadingText="Searching..."
      onClick={() => findNumbers(values)}
    >
      Find number(s)
    </Button>
  </Flex>
);

export default Submit;
