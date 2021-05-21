import { WebClient } from "@slack/web-api";
import endpoints from "../../../config/endpoints";

const client = new WebClient(endpoints.SlackToken);

export default async (numbers: number) => {
  try {
    await client.chat.postMessage({
      token: endpoints.SlackToken,
      channel: endpoints.SlackChannel,
      text: `New Request - Check out Analytics! Sending ${numbers} messages.`,
    });
  } catch (error) {
    await client.chat.postMessage({
      token: endpoints.SlackToken,
      channel: endpoints.SlackChannel,
      text: error,
    });
  }
};
