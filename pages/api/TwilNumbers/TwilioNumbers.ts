import Twilio from "twilio";

export default async (
  req: { body: string },
  res: {
    status: (
      arg0: number
    ) => {
      (): any;
      new (): any;
      json: {
        (arg0: string[]): {
          (): any;
          new (): any;
          end: { (): void; new (): any };
        };
        new (): any;
      };
    };
  }
) => {
  const { apiKey, apiSecret, accountSid } = JSON.parse(req.body);
  const client = Twilio(apiKey, apiSecret, { accountSid: accountSid });

  try {
    await client.incomingPhoneNumbers.list({ limit: 20 }).then((numbers) => {
      const newNumbers = numbers.map((number) => number.phoneNumber);
      return res.status(200).json(newNumbers);
    });
  } catch (error) {
    res.status(404).json(error).end();
  }
};
