import dotenv from "dotenv";

dotenv.config();

export const config = {
  BASE_API_NEWS_URL: process.env.BASE_API_NEWS_URL,
  API_KEY: process.env.NEWS_API_ORG_API_KEY,
};
