import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, username: "jack", displayName: "jack123!" },
  { id: 2, username: "rose", displayName: "roseRoses" },
  { id: 1, username: "ben", displayName: "bigBen" },
  { id: 2, username: "mack", displayName: "mackCheese" },
  { id: 1, username: "loki", displayName: "atreus" },
  { id: 2, username: "thor", displayName: "thorGod" },
  { id: 1, username: "zeus", displayName: "zeus812" },
  { id: 2, username: "hermes", displayName: "herm124" },
  { id: 1, username: "simba", displayName: "lion913" },
  { id: 2, username: "aladin", displayName: "MaginCrpet" },
];

app.get("/", (request, response) => {
  response.status(201).send({ msg: "Hello, World!" });
});

app.get("/api/users", (request, response) => {
  const {
    query: { filter, value },
  } = request;
  if (!filter || !value) response.status(400).send({ msg: "bad request" });

  try{
    return response.send(
        mockUsers.filter((user) => user[filter].includes(value))
      );
  }
  catch(e){
    response.status(400).send({ msg: "bad request" })
  }
});

app.get("/api/users/:id", (reqest, response) => {
  const parsedId = parseInt(reqest.params.id);
  if (isNaN(parsedId)) return response.status(400).send({ msg: "bad request" });

  const findUser = mockUsers.find((user) => user.id === parsedId);
  if (!findUser) return response.status(404).send({ msg: "not found" });

  return response.send(findUser);
});

app.get("/api/products", (request, response) => {
  response.send([
    { id: 123, name: "ckicken breast", price: "12.99" },
    { id: 321, username: "beef", displayName: "18.76" },
  ]);
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
