import getConfig from "next/config";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { publicRuntimeConfig } = getConfig();
// Will be available on both server-side and client-side

import { WebClient, LogLevel } from "@slack/web-api";

const client = new WebClient(publicRuntimeConfig.SLACK_API_TOKEN);

export async function publishMessage(text) {
  try {
    await client.chat.postMessage({
      token: publicRuntimeConfig.SLACK_API_TOKEN,
      channel: publicRuntimeConfig.SLACK_CHANNEL_ID,
      text: text,
    });
  } catch (error) {
    await client.chat.postMessage({
      token: publicRuntimeConfig.SLACK_API_TOKEN,
      channel: publicRuntimeConfig.SLACK_CHANNEL_ID,
      text: error,
    });
  }
}
