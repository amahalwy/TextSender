import Twilio from "twilio";

export default async (
  req: { body: string },
  res: { json: (arg0: any) => any }
) => {
  const { accountSid, apiKey, apiSecret, message, from, to } = JSON.parse(
    req.body
  );

  const client = Twilio(apiKey, apiSecret, { accountSid: accountSid });

  await client.messages
    .create({ body: message, from, to })
    .then((r) => res.json(r));
};
