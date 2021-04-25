import { WebClient } from "@slack/web-api";
import endpoints from "../../../config/endpoints";

const client = new WebClient(endpoints.SlackToken);

export default async () => {
  try {
    await client.chat.postMessage({
      token: endpoints.SlackToken,
      channel: endpoints.SlackChannel,
      text: "New Request. Check out Analytics!!",
    });
  } catch (error) {
    await client.chat.postMessage({
      token: endpoints.SlackToken,
      channel: endpoints.SlackChannel,
      text: error,
    });
  }
};
