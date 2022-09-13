import { createUser, usernameExists } from "./repository.js";

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(email, username, password) {
  try {
    const newUser = await createUser({ email, username, password });
    const savedUser = newUser.save();

    return savedUser;
  } catch (err) {
    return { err };
  }
}

export async function ormUsernameExists(username) {
  const exists = await usernameExists(username);
  return exists;
}
