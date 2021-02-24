import { WebClient, LogLevel } from "@slack/web-api";

const client = new WebClient(process.env.SLACK_API_TOKEN);

export async function publishMessage(text) {
  console.log(process.env);
  try {
    await client.chat.postMessage({
      token: process.env.SLACK_API_TOKEN,
      channel: process.env.SLACK_CHANNEL_ID,
      text: text,
    });
  } catch (error) {
    await client.chat.postMessage({
      token: process.env.SLACK_API_TOKEN,
      channel: process.env.SLACK_CHANNEL_ID,
      text: error,
    });
  }
}
