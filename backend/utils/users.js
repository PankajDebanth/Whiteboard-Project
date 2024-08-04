const users = [];

// Add user to the list
const addUser = ({ name, roomName, description, roomId, userId, host, presenter }) => {
  const existingUser = users.find((user) => user.userId === userId);

  if (!existingUser) {
    const user = { name, roomName, description, roomId, userId, host, presenter };
    users.push(user);
  }

  return users.filter((user) => user.roomId === roomId);
};

// Remove a user from the list
const removeUser = (id) => {
  const index = users.findIndex((user) => user.userId === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
  return null;
};

// Get a user from the list
const getUser = (id) => {
  return users.find((user) => user.userId === id);
};

// Get all users from the room
const getUsersInRoom = (roomId) => {
  return users.filter((user) => user.roomId === roomId);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
