import { User } from "./user.schema.js";
import jwt from "jsonwebtoken";

export async function createUserProvider(req, res) {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "fullName is required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "password is required" });
  }
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.json({
      error: true,
      message: "User with this email already exists",
    });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();
  const tokenPayload = {
    user: {
      fullName: user.fullName,
      email: user.email,
      _id: user._id,
      createdOn: user.createdOn,
    },
  };
  const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, {
    expiresIn: "60m",
  });

  return res.json({
    error: false,
    user: {
      fullName: user.fullName,
      email: user.email,
      _id: user._id,
      createdOn: user.createdOn,
    },
    accessToken,
    message: "Registration successful",
  });
}

export async function loginUserProvider(req, res) {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: true, message: "email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "password is required" });
  }

  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.json({ error: true, message: "User does not exist" });
  }

  if (userInfo.email == email && userInfo.password == password) {
    const tokenPayload = {
      user: {
        fullName: userInfo.fullName,
        email: userInfo.email,
        _id: userInfo._id,
        createdOn: userInfo.createdOn,
      },
    };
    const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, {
      expiresIn: "60m",
    });
    return res.json({
      error: false,
      user: {
        fullName: userInfo.fullName,
        email: userInfo.email,
        _id: userInfo._id,
        createdOn: userInfo.createdOn,
      },
      accessToken,
      message: "Login successful",
    });
  } else {
    return res.json({ error: true, message: "Invalid credentials" });
  }
}

export async function getUserProvider(req, res) {
  const { user } = req.user;

  const isUser = await User.findOne({ _id: user._id });

  if (!isUser) {
    return res.sendStatus(401);
  }
  return res.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
      createdOn: isUser.createdOn,
    },
    message: "",
  });
}
