import Role from "../models/Role.js";
import bcrypt from "bcrypt";
import asynchandler from "express-async-handler";
import { CreateSlug } from "../helpers/createSlug.js";

// create a permiton
export const createroleController = asynchandler(async (req, res) => {
  // get data
  const { name } = req.body;

  let slug = CreateSlug(name);
  const namecheck = await Role.findOne({ name });

  if (namecheck) {
    return res.status(500).json({ message: "Role already Exits" });
  }
  // create new user data
  const role = await Role.create({
    name,
    slug,
  });

  // check
  if (role) {
    return res
      .status(201)
      .json({ message: "permiton created successful", role });
  } else {
    return res.status(400).json({ message: "Invalid role data" });
  }
});

// get all user
export const allpermitonController = asynchandler(async (req, res) => {
  // create new user data
  const permission = await Permission.find();

  // check
  if (permission) {
    return res
      .status(201)
      .json({ message: "permiton created successful", permission });
  } else {
    return res.status(400).json({ message: "Invalid permition data" });
  }
});

// get all user
export const singlepermitonController = asynchandler(async (req, res) => {
  const { id } = req.params;

  // create new user data
  const permission = await Permission.findById(id);

  // check
  if (permission) {
    return res.status(201).json({ message: "Get single permiton", permission });
  } else {
    return res.status(400).json({ message: "Invalid permition data" });
  }
});
