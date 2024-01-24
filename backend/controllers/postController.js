const prisma = require("../common/prisma");
const cloudinary = require("../services/cloudinary");

const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updatePost = async (req, res) => {
  const { postId } = req.params;
    const oldPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (oldPost.userId !== req.user.id) {
      return res.status(403).json({ error: "Permission denied. You are not the owner of this post." });
    }
    
  try {
    const post = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        ...oldPost,
        ...req.body
      },
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// get a post by id
const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
      },
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const {
      name,
      number,
      blood_group,
      amount,
      location,
      details,
      notification,
    } = req.body;
    console.log({ name, number, blood_group, amount });
      let notificationText = `${name} urgently requires ${amount} bag(s) of ${blood_group} blood at ${location}.`;
      const post = await prisma.post.create({
      data: {
        name,
        number,
        blood_group,
        amount: Number(amount),
        location,
        details,
        userId: req?.user.id,
        notification: notificationText,
      },
    });
    
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete post
const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await prisma.post.delete({
      where: {
        id: postId,
        userId: req.user.id,
      },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getPost,
};
