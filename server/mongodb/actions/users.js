import bcrypt from "bcryptjs";
import mongoDB from "../index";
import User from "../models/User";

export async function login(email, password) {
  if (email == null || password == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User does not exist!");
  }

  const didMatch = bcrypt.compare(password, user.password);
  if (!didMatch) {
    throw new Error("The password you entered is incorrect!");
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  };
}

export async function signUp(name, email, password) {
  if (name == null || email == null || password == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  const exists = await User.countDocuments({ email });

  if (exists) {
    throw new Error("The email has already been used!");
  }

  const hashedPassword = await bcrypt.hashSync(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  };
}

export async function getUserFromId(id) {
  await mongoDB();

  try {
    const user = await User.findById(id);

    if (user == null) {
      throw new Error("User does not exist!");
    }

    return {
      id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };
  } catch (e) {
    throw new Error("Invalid token!");
  }
}
