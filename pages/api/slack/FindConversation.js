import { WebClient, LogLevel } from "@slack/web-api";

const client = new WebClient(
  "xoxb-1783110254821-1779432119174-yiM8UVos8zVqP9rMpK8pL8tJ",
  {
    // LogLevel can be imported and used to make debugging simpler
    // logLevel: LogLevel.DEBUG,
  }
);

export async function findConversation(name) {
  try {
    // Call the conversations.list method using the built-in WebClient
    const result = await client.conversations.list({
      // The token you used to initialize your app
      token: "xoxb-1783110254821-1779432119174-yiM8UVos8zVqP9rMpK8pL8tJ",
    });

    for (const channel of result.channels) {
      if (channel.name === name) {
        let conversationId = channel.id;

        // Print result
        console.log("Found conversation ID: " + conversationId);
        // Break from for loop
        break;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

// Find conversation with a specified channel `name`
findConversation("tester-channel");
