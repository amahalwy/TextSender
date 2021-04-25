import Twilio from "twilio";

export default async (req: { body: string }, res: any) => {
  const { sid, token, To } = JSON.parse(req.body);
  const client = Twilio(sid, token);

  await client.lookups.phoneNumbers(To).fetch({ type: ["carrier"] });
};
