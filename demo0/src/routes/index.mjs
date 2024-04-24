import { Router } from "express";

import usersRouter from "./users.mjs";
import productsRouter from "./products.mjs";

const router = Router();

router.use(usersRouter);
router.use(productsRouter);

router.get("/", (request, response) => {
  response.cookie("hello", "world", {maxAge: 10000, signed: true});
    return response.status(201).send({ msg: "Hello, World!" });
  });

export default router;