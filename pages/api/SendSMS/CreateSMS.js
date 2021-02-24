const Twilio = require("twilio");

export default (req, res) => {
  const { accountSid, apiKey, apiSecret, message, from, to } = JSON.parse(
    req.body
  );

  var client = new Twilio(apiKey, apiSecret, { accountSid: accountSid });

  client.messages.create({ body: message, from, to }).then((r) => res.json(r));
};
