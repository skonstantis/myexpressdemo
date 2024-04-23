import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
    return response.send([
      { id: 1, name: "ckicken breast", price: "12.99" },
      { id: 2, username: "beef", displayName: "18.76" },
      { id: 3, name: "checken wing", price: "5.99" },
      { id: 4, username: "oats", displayName: "8.34" },
      { id: 5, name: "milk", price: "6.56" },
      { id: 6, username: "eggs", displayName: "4.21" },
    ]);
  });

export default router;