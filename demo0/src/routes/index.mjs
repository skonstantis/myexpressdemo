import { request, response, Router } from "express";

import usersRouter from "./users.mjs";
import productsRouter from "./products.mjs";
import authRouter from "./auth.mjs";
import cartRouter from "./cart.mjs";

const router = Router();

router.use(usersRouter);
router.use(productsRouter);
router.use(authRouter);
router.use(cartRouter);

router.get("/", (request, response) => {
  console.log(request.session.id);
  request.session.visited = true;
  response.cookie("hello", "world", { maxAge: 10000, signed: true });
  return response.status(201).send({ msg: "Hello, World!" });
});

export default router;