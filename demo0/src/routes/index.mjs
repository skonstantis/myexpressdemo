import { Router } from "express";

import usersRouter from "./users.mjs";
import productsRouter from "./products.mjs";

const router = Router();

router.use(usersRouter);
router.use(productsRouter);

router.get("/", (request, response) => {
    return response.status(201).send({ msg: "Hello, World!" });
  });

export default router;