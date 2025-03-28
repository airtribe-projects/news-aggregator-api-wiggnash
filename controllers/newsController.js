import axios from "axios";
import { config } from "../config/config.js";

export const getNews = async (req, res) => {
  try {
    const newsSource = await axios.get(config.BASE_API_NEWS_URL, {
      headers: {
        "X-Api-Key": config.API_KEY,
      },
    });

    res.send(newsSource);
  } catch (err) {
    console.error(err);
  }
};
