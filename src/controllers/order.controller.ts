
import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const orderControllers = {
    getOrders: async (req: Request, res: Response) => {
        try {
            const orders = await prisma.order.findMany();

            res.status(200).json({
                success: true,
                orders
            });

        } catch (error) {
            console.error("Internal Server Error While Fetching Orders", error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error While Fetching Orders"
            });
        }
    },

    createOrder: async (req: Request, res: Response) => {
        try {
            const { name, description, category } = req.body;

            if (!name || !description || !category) {
                res.status(400).json({
                    success: false,
                    message: "Name, description & category are required!"
                });
                return;
            }

            const order = await prisma.order.create({
                data: {
                    name,
                    description,
                    category
                }
            });

            res.status(201).json({
                success: true,
                message: "Order created successfully",
                order
            });

        } catch (error) {
            console.error("Internal Server Error While Creating Order", error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error While Creating Order"
            });
        }
    },

    updateOrder: async (req: Request, res: Response) => {
        try {
            const { name, description, category, orderId } = req.body;

            if (!orderId) {
                res.status(400).json({
                    success: false,
                    message: "Order ID is required"
                });
                return;
            }

            const order = await prisma.order.update({
                where: {
                    id: String(orderId)
                },
                data: {
                    name,
                    description,
                    category
                }
            });

            res.status(200).json({
                success: true,
                message: "Order updated successfully",
                order
            });

        } catch (error) {
            console.error("Internal Server Error While Updating Order", error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error While Updating Order"
            });
        }
    },

    deleteOrder: async (req: Request, res: Response) => {
        try {
            const { orderId } = req.body;

            if (!orderId) {
                res.status(400).json({
                    success: false,
                    message: "Order ID is required"
                });
                return;
            }

            const order = await prisma.order.delete({
                where: {
                    id: String(orderId)
                }
            });

            res.status(200).json({
                success: true,
                message: "Order deleted successfully",
                order
            });

        } catch (error) {
            console.error("Internal Server Error While Deleting Order", error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error While Deleting Order"
            });
        }
    },
};
