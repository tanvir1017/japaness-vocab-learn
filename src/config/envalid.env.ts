import dotenv from "dotenv";
import { cleanEnv, str } from "envalid";
import path from "path";

// Declaring path for specific .env files
dotenv.config({ path: path.join(process.cwd(), ".env") });

const env = cleanEnv(process.env, {
  API_BASE_URL: str(),
  API_BASE_URL_FOR_PROD: str(),
  AUTH_SECRET: str(),
});

export default env;
