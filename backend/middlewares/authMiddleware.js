const prisma = require("../common/prisma");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req?.headers?.authorization?.split(' ')[1];
  if (token) {
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await prisma.user.findUnique({
          where: {
            id: decoded?.id,
          },
        });

        req.user = user;
        next();
      }
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Not Authorized token expired, Please Login again" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "There is no token attached to header" });
  }
};

const verifyUser = async (req, res, next) => {
  const { email, id } = req.user;

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  } else {
    next();
  }
};

// const verifySeller = async (req, res, next) => {
//   const { email } = req.user;

//   const adminUser = await prisma.user.findUnique({ where: { email } });
//   if (adminUser.role !== "USER") {
//     return res.status(400).json({ message: "You are not a USER!" });
//   } else {
//     next();
//   }
// };


module.exports = { authMiddleware, verifyUser};
