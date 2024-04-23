import { Router } from "express";
import {
  query,
  validationResult,
  checkSchema,
  matchedData,
} from "express-validator";
import { mockUsers } from "../utils/constants.mjs";
import { createUserValidationSchema } from "../utils/validationSchemas.mjs";
import { resolveIndexByUserId } from "../utils/middlewares.mjs";

const router = Router();

router.get(
  "/api/users",
  query("filter")
    .isString()
    .withMessage("Must be string")
    .notEmpty()
    .withMessage("Must not be empty"),
  (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() });

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
  }
);

router.get("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  const findUser = mockUsers[findUserIndex];
  return response.send(findUser);
});

router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() });

    const data = matchedData(request);

    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
    mockUsers.push(newUser);
    return response.status(201).send(newUser);
  }
);

router.put("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return response.sendStatus(200);
});

router.patch("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return response.sendStatus(200);
});

router.delete("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});

export default router;
