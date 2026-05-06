import Joi from "joi";

export const getProductsSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(10),
  sort: Joi.string().valid("featured", "latest", "price_asc", "price_desc").default("latest"),
  categoryId: Joi.string().hex().length(24),
  search: Joi.string().trim().allow(""),
  exclude: Joi.string().hex().length(24),
});
