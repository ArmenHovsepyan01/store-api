import { Request, Response } from "express";
import productService from "../services/ProductService";

class ProductController {
    async createProduct(req: Request, res: Response) {
        try {
            console.log(req.body);
            await productService.createProduct();
            res.status(200).send("Product successfully has been created.");
        } catch (e) {
            res.status(400).json({
                error: e.message
            })
        }
    }

    async getProductById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const product = await productService.getProductById(id);
            res.status(200).json({
                product: product
            });
        } catch (e) {
            res.status(400).json({
                error: e.message
            })
        }
    }
}

export default new ProductController();