const prisma = require("../common/prisma");
const cloudinary = require("../services/cloudinary");
//const { COLORS, SIZES, FONTS } = require('../frontend/constants');
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
// const updatePost = async (req, res) => {
//   const  postid  = req.post.id;
//   const { name, number, blood_group, location, amount,details } =
//     req.body;

//     const oldPost = await prisma.post.findUnique({
//       where: {
//         id: postid,
//       },
//     });


//   const post = await prisma.post.update({
//     where: {
//       id: postid,
//     },
//     data: {
//       ...oldPost,
//       ...req.body
//     },
//   });
//   res.status(200).json(post);
// };






const updatePost = async (req, res) => {
  const { postId } = req.params;
 
    const oldPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    
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
    console.log({blood_group,location });
    let notificationText = `Hey! Someone urgently needs ${blood_group} blood at ${location}.`;
    //const notificationText = `<span style="font-family: ${FONTS.h3.fontFamily}; font-size: ${FONTS.h3.fontSize}px; line-height: ${FONTS.h3.lineHeight}px; color: #333;">${name} needs ${amount} bag of ${blood_group} group blood urgently at ${location}.</span>`;
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
