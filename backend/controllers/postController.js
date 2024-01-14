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
//update post 
const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { name,
    number,
    blood_group,
    amount,
    location,
    details } = req.body;

  try {
    const post = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        name,
        number,
        blood_group,
        amount,
        location,
        details
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
    } = req.body;
    console.log({ name, number, blood_group, amount });
      const post = await prisma.post.create({
      data: {
        name,
        number,
        blood_group,
        amount: Number(amount),
        location,
        details,
        userId: req?.user.id,
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
