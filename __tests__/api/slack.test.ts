import React from "react";
import { WebClient } from "@slack/web-api";
import fetch from "node-fetch";
import publishMessage from "../../pages/api/slack/SendSlackMsg";

require("dotenv").config({
  path: ".env.test",
});

describe("Slack API", () => {
  const client = new WebClient(process.env.NEXT_PUBLIC_SLACK_API_TOKEN);
  test("Should respond with ok", async () => {
    // const req = await publishMessage();
  });
});
