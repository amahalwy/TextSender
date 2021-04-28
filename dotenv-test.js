import { resolve } from "path";
import { config } from "dotenv";

export default async () => {
  config({ path: resolve(__dirname, ".env.test") });
};
