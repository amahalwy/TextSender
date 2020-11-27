const Twilio = require("twilio");

export default (req, res) => {
  const { apiKey, apiSecret, accountSid } = JSON.parse(req.body);
  const client = new Twilio(apiKey, apiSecret, { accountSid: accountSid });

  client.incomingPhoneNumbers
    .list({ limit: 20 })
    .then((numbers) => {
      let arr = [];

      numbers.forEach((num) => {
        arr.push(num.phoneNumber);
      });
      return arr;
    })
    .then((r) => res.json(r));
};
