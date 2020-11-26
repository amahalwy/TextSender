const Twilio = require('twilio');

export default (req, res) => {
  const {sid, token, From} = JSON.parse(req.body);
  const client = new Twilio(sid, token);

  client.incomingPhoneNumbers
    .list({limit:20})
    .then(numbers => {
      let arr = []

      numbers.forEach(num => {
        arr.push(num.phoneNumber)
      })
      return arr
    })
    .then(r => res.json(r))
}