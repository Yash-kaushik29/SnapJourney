const express = require("express");
const User = require("../models/User");
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get("/search-friends", async (req, res) => {
  const { query = "", page = 1 } = req.query;
  const PAGE_SIZE = 12;
  const skip = (page - 1) * PAGE_SIZE;

  try {
    const baseFilter = { _id: { $ne: currentUserId } };

    let filter;
    if (!query.trim()) {
      filter = baseFilter;
    } else {
      const regex = new RegExp(query, "i");
      filter = { ...baseFilter, username: { $regex: regex } };
    }

    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .sort(!query.trim() ? { followers: -1 } : {}) 
      .skip(skip)
      .limit(PAGE_SIZE);

    res.status(200).send({ success: true, users, total });
  } catch (error) {
    console.error("User search failed:", error);
    res.status(500).send({ error: "Server error" });
  }
});

module.exports = router;
