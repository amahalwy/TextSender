import { FormApi } from "final-form";
export interface IValues {
  numbers: string;
  accountSid?: string | undefined;
  apiKey?: string | undefined;
  apiSecret?: string | undefined;
  message?: string | undefined;
  from?: string | undefined;
}
export interface IBottomSection {
  submitting: boolean;
  pristine: boolean;
  form: FormApi<IValues, Partial<IValues>>;
  invalid: boolean;
  numbers: any[];
  setShowBottom: (value: boolean) => void;
  setShowTwilioSection: (value: boolean) => void;
}
export interface IFormSection {
  numbers: string[];
  showBottom: boolean;
  loadingNumbers: boolean;
  showTwilioSection: boolean;
  setFormData: (values: IReceiver[]) => void;
  setLoadingNumbers: (value: boolean) => void;
  setNumbers: (value: string[]) => void;
  setShowTwilioSection: (value: boolean) => void;
  setShowBottom: (value: boolean) => void;
}

export interface INumber {
  accountSid: string;
  apiKey: string;
  apiSecret: string;
  message: string;
  from: string;
  to: string;
  timeToSend: number;
}

export interface IReceiver {
  to: string;
  timeToSend: number;
  accountSid: string | undefined;
  apiKey: string | undefined;
  apiSecret: string | undefined;
  message: string | undefined;
  from: string | undefined;
}

export interface ISuccess {
  addSuccess: boolean;
  setAddSuccess: (value: boolean) => void;
  successfulTexts: number;
  setSuccessfulTexts: (value: number) => void;
}

export interface IFailed {
  addFailed: boolean;
  setAddFailed: (value: boolean) => void;
  failedTexts: number;
  setFailedTexts: (value: number) => void;
}

export interface INumberSendRow {
  receiver: IReceiver;
  failedTexts: number;
  successfulTexts: number;
  setFailedTexts: (value: number) => void;
  setSuccessfulTexts: (value: number) => void;
}

export interface ISubmitSection {
  submitting: boolean;
  pristine: boolean;
  invalid: boolean;
  loadingNumbers: boolean;
  findNumbers: (values: IValues) => void;
  values: IValues;
}
