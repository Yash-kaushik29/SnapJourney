const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/following", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.userID).populate(
    "following",
    "_id"
  );
  res.json(user);
});

router.post("/follow", authMiddleware, async (req, res) => {
  try {
    const currentUserId = req.user.userID;
    const { userId: targetUserId } = req.body;

    if (currentUserId === targetUserId) {
      return res.status(400).json({ error: "You cannot follow yourself." });
    }

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ error: "User to follow not found." });
    }

    if (!currentUser.following.includes(targetUserId)) {
      currentUser.following.push(targetUserId);
      await currentUser.save();
    }

    if (!targetUser.followers.includes(currentUserId)) {
      targetUser.followers.push(currentUserId);
      await targetUser.save();
    }

    res.status(200).json({ success: true, message: "Followed successfully." });
  } catch (error) {
    console.error("Follow error:", error);
    res.status(500).json({ success: false, error: "Server error during follow." });
  }
});

router.post("/unfollow", authMiddleware, async (req, res) => {
  try {
    const currentUserId = req.user.userID; 
    const { userId: targetUserId } = req.body;

    if (currentUserId === targetUserId) {
      return res.status(400).json({ error: "You cannot unfollow yourself." });
    }

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ success: false, message: "User to unfollow not found." });
    }

    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== targetUserId
    );

    targetUser.followers = targetUser.followers.filter(
      (id) => id.toString() !== currentUserId
    );

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({ success: true, message: "Unfollowed successfully." });
  } catch (error) {
    console.error("Unfollow error:", error);
    res.status(500).json({ success: false, error: "Server error during unfollow." });
  }
});


module.exports = router;
