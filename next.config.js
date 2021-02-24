module.exports = {
  publicRuntimeConfig: {
    // Will be available on both server and client
    SLACK_CHANNEL_ID: process.env.SLACK_CHANNEL_ID,
    SLACK_API_TOKEN: process.env.SLACK_API_TOKEN, // Pass through env variables
  },
};
