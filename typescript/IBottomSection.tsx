import { FormApi } from "final-form";

interface Values {
  numbers: string[];
  accountSid?: string | undefined;
  apiKey?: string | undefined;
  apiSecret?: string | undefined;
  message?: string | undefined;
  from?: string | undefined;
}

export interface IBottomSection {
  submitting: boolean;
  pristine: boolean;
  form: FormApi<Values, Partial<Values>>;
  invalid: boolean;
  numbers: any[];
  setShowBottom: (value: boolean) => void;
  setShowTwilioSection: (value: boolean) => void;
}
