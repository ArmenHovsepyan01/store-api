import Product from "../models/Product";
import ProductImage from "../models/ProductImage";
import ProductCategories from "../models/ProductCategories";
import ProductColors from "../models/ProductColors";
import ProductSizes from "../models/ProductSizes";
import product from "../models/Product";
import sequelize from "../config/database";
import productImage from "../models/ProductImage";
import {isPlainText} from "nodemailer/lib/mime-funcs";
import {privateDecrypt} from "node:crypto";

interface createProductParams {
    name: string,
    description: string,
    price: string,
    brand: string,
    sizes: string,
    colors: string,
    categories: string,
    main_image: string,
    images: string []
}
class ProductService {
    async createProduct (body: createProductParams){
        try {
            const { name, description, price, brand, main_image, images, colors, sizes, categories } = body;
            const productImages = images.map((item) => {
                return {
                    imageUrl: item
                }
            });

            const product  = await Product.create({
                name: name,
                description: description,
                price: price,
                brand: brand,
                main_image: main_image,
                category: "Clothes",
                images: productImages,
            }, {
                include: [
                    {
                        model: ProductImage,
                        as: 'images'
                    }
                ]
            });

            console.log(product);

        } catch (e) {
            throw new Error(e);
        }
    }

    async getProductById(id: string) {
        try {
           return await Product.findByPk(id, { include: [
                { model: ProductImage, as: 'images' },
                { model: ProductColors, as: 'colors' },
                { model: ProductSizes, as: 'sizes' }
            ] });
        } catch (e) {
            throw new Error(e);
        }
    }
}

export default new ProductService();