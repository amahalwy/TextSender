export default {
  FindTwilioEndpoint: process.env.NEXT_PUBLIC_FIND_TWILIO_ENDPOINT ?? "",
  GAid: process.env.NEXT_PUBLIC_GA_ID ?? "",
  SendSMS: process.env.NEXT_PUBLIC_SEND_SMS_ENDPOINT ?? "",
  SlackToken: process.env.NEXT_PUBLIC_SLACK_API_TOKEN ?? "",
  SlackChannel: process.env.NEXT_PUBLIC_SLACK_CHANNEL_ID ?? "",
};
