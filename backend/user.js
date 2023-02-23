const users = [];

export const addUser = (user) => {
  users.push(user);
};

export const getUsers = () => {
  return users;
};

export const getWaitingUsers = () => {
  return users.filter(
    (user) => users.filter((u) => u.room === user.room).length === 1
  );
};

export const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  users.splice(index, 1);
};

export const removeUserFromRoom = (room) => {
  const index = users.findIndex((user) => user.room === room);
  users.splice(index, 1);
};
