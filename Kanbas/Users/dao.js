import Database from "../Database/index.js";
let { users } = Database;

export const createUser = (user) => {
  const newUser = { ...user, _id: Date.now() };
  users = [...users, newUser]; 
  return newUser;
};

export function createCourse(course) {
  const newCourse = { ...course, _id: Date.now().toString() };
  Database.courses = [...Database.courses, newCourse];
  return newCourse;
}

export const findAllUsers = () => users;

export const findUserById = (userId) => users.find((user) => user._id === userId);

export const findUserByUsername = (username) => users.find((user) => user.username === username);

export const findUserByCredentials = (username, password) =>
  users.find((user) => user.username === username && user.password === password);

export const updateUser = (userId, updatedUser) => {
  users = users.map((user) => (user._id === userId ? { ...user, ...updatedUser } : user));
  return users.find((user) => user._id === userId); // Return the updated user
};

export const deleteUser = (userId) => {
  users = users.filter((user) => user._id !== userId);
  return users;  // Optionally, return the updated list of users
};
