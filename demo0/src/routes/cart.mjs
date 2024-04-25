import { request, response, Router } from "express";

import usersRouter from "./users.mjs";

const router = Router();

router.use(usersRouter);

router.post("/api/cart", (request, response) => {
  if(!request.session.user) return response.status(401).send([{ msg: "Not Authenticated" }]);
  const { body: item } = request;

  const {cart} = request.session;

  if(cart)
  {
    cart.push(item);
  }
  else
  {
    request.session.cart = [item];
  }
  return response.status(201).send(item);
});

router.get("/api/cart", (request, response) => {
  return request.session.user
    ? response.status(200).send(request.session.cart ?? [])
    : response.status(401).send([{ msg: "Not Authenticated" }]);
});

export default router;
