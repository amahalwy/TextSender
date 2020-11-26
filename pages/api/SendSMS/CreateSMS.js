// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const Twilio = require("twilio");

export default (req, res) => {
  const { sid, token, message, from, to } = JSON.parse(req.body);
  const client = new Twilio(sid, token);

  client.messages.create({ body: message, from, to }).then((r) => res.json(r));
};
