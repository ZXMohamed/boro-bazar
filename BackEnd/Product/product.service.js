import { findProducts } from "./product.repository.js";

const SORT_MAPPING = {
  featured: { isFeatured: -1 },
  latest: { createdAt: -1 },
  price_asc: { price: 1 },
  price_desc: { price: -1 },
};

/**
 * @typedef {Object} Product
 * @property {string} _id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {string} categoryId
 * @property {boolean} isFeatured
 */

/**
 * @typedef {Object} GetProductsQuery
 * @property {number} page
 * @property {number} limit
 * @property {string} sort
 * @property {string} [categoryId]
 * @property {string} [search]
 * @property {string} [exclude]
 */

/**
 * @typedef {Object} PaginatedResponse
 * @property {Product[]} products
 * @property {number} total
 * @property {number} page
 * @property {number} pages
 */

/**
 * Helper to build Mongoose filter object
 */
const buildProductQuery = (query) => {
  const { categoryId, search, exclude } = query;
  const filters = {};

  if (categoryId) {
    filters.categoryId = categoryId;
  }

  if (search) {
    // Case-insensitive regex on name and description
    // Using $or for multiple fields
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (exclude) {
    filters._id = { $ne: exclude };
  }

  return filters;
};

/**
 * Service to handle business logic for getting products
 */
export const getProductsService = async (query) => {
  const { page, limit, sort } = query;

  const filters = buildProductQuery(query);
  const sortOption = SORT_MAPPING[sort] || SORT_MAPPING.latest;

  const skip = (page - 1) * limit;

  const { products, total } = await findProducts({
    filters,
    sort: sortOption,
    skip,
    limit,
  });

  const pages = Math.ceil(total / limit);

  return {
    products,
    total,
    page,
    pages,
  };
};
