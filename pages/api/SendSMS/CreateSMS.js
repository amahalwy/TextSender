// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const Twilio = require('twilio');

export default (req, res) => {
  const {sid, token, message, From, To} = JSON.parse(req.body);
  const client = new Twilio(sid, token);
  console.log(req.body);
  client.messages
    .create({body: message, from: From, to: To})
    .then(r => res.json(r)); 
}