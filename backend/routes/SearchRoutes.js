const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/search-friends", async (req, res) => {
  const { query = "", page = 1 } = req.query;
  const PAGE_SIZE = 12;
  const skip = (page - 1) * PAGE_SIZE;

  try {
    let users;
    let total;

    const regex = new RegExp(query, "i");

    if (!query.trim()) {
      total = await User.countDocuments();
      users = await User.find()
        .sort({ followers: -1 })
        .skip(skip)
        .limit(PAGE_SIZE);
    } else {
      total = await User.countDocuments({ username: { $regex: regex } });
      users = await User.find({ username: { $regex: regex } })
        .skip(skip)
        .limit(PAGE_SIZE);
    }

    res.status(200).send({ success: true, users, total });
  } catch (error) {
    console.error("User search failed:", error);
    res.status(500).send({ error: "Server error" });
  }
});

module.exports = router;
