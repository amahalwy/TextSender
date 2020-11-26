// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const Twilio = require('twilio');

export default (req, res) => {
  const {sid, token, To} = JSON.parse(req.body);
  const client = new Twilio(sid, token);
  
  client.lookups.phoneNumbers(To)
    .fetch({type: ['carrier']})
    .then(phone_number => console.log(phone_number));
}