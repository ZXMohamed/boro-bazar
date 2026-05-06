import Product from "./product.schema.js";

/**
 * Repository to handle Mongoose queries for Products
 */
export const findProducts = async ({ filters, sort, skip, limit }) => {
  const products = await Product.find(filters)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate("categoryId", "name slug image")
    .lean();

  const total = await Product.countDocuments(filters);

  return { products, total };
};
