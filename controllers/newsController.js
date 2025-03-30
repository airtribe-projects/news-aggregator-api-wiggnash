import axios from "axios";
import { config } from "../config/config.js";
import User from "../models/userModel.js";

export const getNews = async (req, res) => {
  try {
    // Fetch user preferences
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userPreferences = user.preferences;
    const domains = userPreferences.categories.join(",");
    const endPointURL = `${config.BASE_API_NEWS_URL}?q=${domains[0]}&language=${userPreferences.language}&domain=${domains}`;
    console.log(endPointURL);
    const newsSource = await axios.get(endPointURL, {
      headers: {
        "X-Api-Key": config.API_KEY,
      },
    });

    res.status(200).json(newsSource.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
