import categories from "../models/Categories";
import { Op } from "sequelize";

export const createWhereClause = (queries: any) => {
    const productWhereClause: {
        price?:{}
    } = {};
    const categoryWhereClause: { id?: string} = {};

    for (const key in queries) {
        if(key === "categoryId") {
            categoryWhereClause.id = queries[key]
        } else if(key === "price_min"){
            if(productWhereClause.price) {
                productWhereClause.price[Op.gte] =  queries[key]
            } else {
                productWhereClause.price = {
                    [Op.gte]: queries[key]
                }
            }
        } else if (key === "price_max") {
            if(productWhereClause.price) {
                productWhereClause.price[Op.lte] =  queries[key]
            } else {
                productWhereClause.price = {
                    [Op.lte]: queries[key]
                }
            }
        } else {
           productWhereClause[key] = {
               [Op.substring]: queries[key]
           }
        }
    }

    return {
        productWhereClause: productWhereClause,
        categoryWhereClause: categoryWhereClause
    }
}