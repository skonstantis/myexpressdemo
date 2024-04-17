import express, { request, response } from "express";

const app = express();

app.use(express.json());

const resolveIndexByUserId = (request, response, next) => {
  const {
    body,
    params: { id },
  } = request;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(404);
  request.findUserIndex = findUserIndex;
  next();
};

const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, username: "jack", displayName: "jack123!" },
  { id: 2, username: "rose", displayName: "roseRoses" },
  { id: 3, username: "ben", displayName: "bigBen" },
  { id: 4, username: "mack", displayName: "mackCheese" },
  { id: 5, username: "loki", displayName: "atreus" },
  { id: 6, username: "thor", displayName: "thorGod" },
  { id: 7, username: "zeus", displayName: "zeus812" },
  { id: 8, username: "hermes", displayName: "herm124" },
  { id: 9, username: "simba", displayName: "lion913" },
  { id: 10, username: "aladin", displayName: "MaginCrpet" },
];

app.get("/", (request, response) => {
  return response.status(201).send({ msg: "Hello, World!" });
});

app.get("/api/users", (request, response) => {
  const {
    query: { filter, value },
  } = request;

  if (!filter && !value) return response.status(200).send({ mockUsers });

  if (!filter || !value)
    return response.status(400).send({ msg: "bad request" });

  try {
    return response.send(
      mockUsers.filter((user) => user[filter].includes(value))
    );
  } catch (e) {
    return response.status(400).send({ msg: "bad request" });
  }
});

app.post("/api/users", (request, response) => {
  const { body } = request;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return response.status(201).send(newUser);
});

app.get("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const {findUserIndex} = request;
  const findUser = mockUsers[findUserIndex];
  return response.send(findUser);
});

app.get("/api/products", (request, response) => {
  return response.send([
    { id: 1, name: "ckicken breast", price: "12.99" },
    { id: 2, username: "beef", displayName: "18.76" },
    { id: 3, name: "checken wing", price: "5.99" },
    { id: 4, username: "oats", displayName: "8.34" },
    { id: 5, name: "milk", price: "6.56" },
    { id: 6, username: "eggs", displayName: "4.21" },
  ]);
});

app.put("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return response.sendStatus(200);
});

app.patch("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return response.sendStatus(200);
});

app.delete("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
