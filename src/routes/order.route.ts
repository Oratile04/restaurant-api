
import { Router } from "express";
import { orderControllers } from "../controllers/order.controller";

export const orderRoutes = Router();

orderRoutes.get("/", orderControllers.getOrders);
orderRoutes.post("/", orderControllers.createOrder);
orderRoutes.put("/", orderControllers.updateOrder);
orderRoutes.delete("/", orderControllers.deleteOrder);
