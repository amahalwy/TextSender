import { WebClient } from "@slack/web-api";

const client = new WebClient(process.env.NEXT_PUBLIC_SLACK_API_TOKEN);

export async function publishMessage() {
  try {
    await client.chat.postMessage({
      token: process.env.NEXT_PUBLIC_SLACK_API_TOKEN,
      channel: process.env.NEXT_PUBLIC_SLACK_CHANNEL_ID,
      text: "New Request. Check out Analytics!!",
    });
  } catch (error) {
    await client.chat.postMessage({
      token: process.env.NEXT_PUBLIC_SLACK_API_TOKEN,
      channel: process.env.NEXT_PUBLIC_SLACK_CHANNEL_ID,
      text: error,
    });
  }
}
