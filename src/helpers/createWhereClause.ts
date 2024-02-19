import { Op } from 'sequelize';

export const createWhereClause = (queries: any, isVerified?: boolean) => {
  const productWhereClause: {
    price?: {};
    isPublished?: boolean;
    category_id?: number | string;
  } = {};

  const productSizesWhereClause = {};

  for (const key in queries) {
    if (key === 'categoryId') {
      productWhereClause.category_id = queries[key];
    } else if (key === 'price_min') {
      if (productWhereClause.price) {
        productWhereClause.price[Op.gte] = queries[key];
      } else {
        productWhereClause.price = {
          [Op.gte]: queries[key]
        };
      }
    } else if (key === 'price_max') {
      if (productWhereClause.price) {
        productWhereClause.price[Op.lte] = queries[key];
      } else {
        productWhereClause.price = {
          [Op.lte]: queries[key]
        };
      }
    } else {
      productWhereClause[key] = {
        [Op.substring]: queries[key]
      };
    }
  }

  if (!isVerified) productWhereClause.isPublished = true;

  return productWhereClause;
};
