import Product from "../models/Product";
import ProductImage from "../models/ProductImage";
import ProductColors from "../models/ProductColors";
import ProductSizes from "../models/ProductSizes";
import Categories from "../models/Categories";
import ProductCategory from "../models/ProductCategory";

interface createProductParams {
  name: string;
  description: string;
  price: string;
  brand: string;
  sizes: string;
  colors: string;
  categoryId: string;
  main_image: string;
  images: string[];
}

class ProductService {
  async createProduct(body: createProductParams) {
    try {
      const {
        name,
        description,
        price,
        brand,
        main_image,
        images,
        colors,
        sizes,
        categoryId,
      } = body;
      const productImages = images.map((item) => {
        return {
          imageUrl: item,
        };
      });

      const product = await Product.create(
        {
          name: name,
          description: description,
          price: price,
          brand: brand,
          main_image: main_image,
          images: productImages,
        },
        {
          include: [
            {
              model: ProductImage,
              as: "images",
            },
            { model: Categories, as: "category" },
          ],
        }
      );

      await ProductCategory.create({
        productId: product.dataValues.id,
        categoryId: categoryId,
      });

      return product;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getProductById(id: string) {
    try {
      const product = await Product.findByPk(id, {
        include: [
          { model: ProductImage, as: "images" },
          { model: ProductColors, as: "colors" },
          { model: ProductSizes, as: "sizes" },
          { model: Categories, as: "category" },
        ],
      });

      return product;
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  }

  async getAllProducts() {
    try {
      const products = await Product.findAll({
        include: [
          { model: ProductImage, as: "images" },
          { model: ProductColors, as: "colors" },
          { model: ProductSizes, as: "sizes" },
          { model: Categories, as: "category" },
        ],
      });

      return products;
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default new ProductService();
