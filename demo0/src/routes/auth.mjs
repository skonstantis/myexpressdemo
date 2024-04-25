import { request, response, Router } from "express";

import usersRouter from "./users.mjs";
import { mockUsers } from "../utils/constants.mjs";

const router = Router();

router.use(usersRouter);

router.post("/api/auth", (request, response) => {
  const {
    body: { username, password },
  } = request;
  const findUser = mockUsers.find((user) => user.username == username);
  if (!findUser || findUser.password != password)
    return response.status(401).send("Invalid credentials");
  request.session.user = findUser;
  return response.status(200).send(findUser);
});

router.get("/api/auth/status", (request, response) => {
  return request.session.user
    ? response.status(200).send(request.session.user)
    : response.status(401).send({ msg: "Not Authenticated" });
});

export default router;
