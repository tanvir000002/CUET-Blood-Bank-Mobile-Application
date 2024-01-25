const prisma = require("../common/prisma");
const bcrypt = require("bcryptjs");
const generateToken = require("../services/jwtTokenGenarate");
// create a new user

const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      number,
      blood_group,
      location,
      available,
      role,
    } = req.body;
    console.log({ name, email });

    const user = await prisma.user.create({
      data: {
        ...req.body,
        password: bcrypt.hashSync(password, 10),
      },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error("User does not exist");
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid Credentials");
    }

    const token = generateToken(user.id);
    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 3, // Token expiration time (3 days in milliseconds)
      })
      .status(200)
      .json({
        user,
        token,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// logout a user and clear cookie
const logoutUser = async (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logged out" });
};

// get all users
const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
};

// get a single user
const getUser = async (req, res) => {
  const  userid  = req?.user?.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userid,
    },

  });
  res.status(200).json(user);
};


const getUsersByBloodGroupAndLocation = async (req, res) => {
  const { blood_group, location } = req.params;
  let whereCondition = {};

  if (blood_group) {
    whereCondition.blood_group = blood_group;
  }

  if (location) {
    whereCondition.location = location;
  }

  const users = await prisma.user.findMany({
    where: whereCondition,
  });

  res.status(200).json(users);
};





// update a user
const updateUser = async (req, res) => {
  const  userid  = req.user.id;
  const { name, email, password, number, blood_group, location, available } =
    req.body;

    const oldUser = await prisma.user.findUnique({
      where: {
        id: userid,
      },
    });


  const user = await prisma.user.update({
    where: {
      id: userid,
    },
    data: {
      ...oldUser,
      ...req.body,
      password: bcrypt.hashSync(password, 10),
    },
  });
  res.status(200).json(user);
};

// delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id: id,
    },
  });

  res.status(200).json(user);
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  getUsersByBloodGroupAndLocation,
};
