import { WebClient, LogLevel } from "@slack/web-api";

const client = new WebClient(
  "xoxb-1783110254821-1779432119174-yiM8UVos8zVqP9rMpK8pL8tJ"
);

export async function publishMessage(text) {
  try {
    const result = await client.chat.postMessage({
      token: "xoxb-1783110254821-1779432119174-yiM8UVos8zVqP9rMpK8pL8tJ",
      channel: "C01P45V5Y8J",
      text: text,
    });
  } catch (error) {
    const result = await client.chat.postMessage({
      token: "xoxb-1783110254821-1779432119174-yiM8UVos8zVqP9rMpK8pL8tJ",
      channel: "C01P45V5Y8J",
      text: error,
    });
  }
}
