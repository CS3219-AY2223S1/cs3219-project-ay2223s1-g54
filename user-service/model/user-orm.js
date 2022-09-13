import { createUser, deleteUserById, emailExists, usernameExists } from "./repository.js";

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(email, username, password) {
  const createdUser = await createUser({ email, username, password });
  return createdUser;
}

export async function ormDeleteUserById(id) {
  const deletedUser = await deleteUserById(id);
  return deletedUser;
}

export async function ormUsernameExists(username) {
  const exists = await usernameExists(username);
  return exists;
}

export async function ormEmailExists(email) {
  const exists = await emailExists(email);
  return exists;
}
