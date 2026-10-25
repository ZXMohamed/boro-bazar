import Cart from './cart.schema.js';

export default class CartService {
  constructor() {
    this.cart = Cart;
  }

  normalizeVariants(variants = {}) {
    if (variants instanceof Map) return Object.fromEntries(variants);
    if (variants && typeof variants.toObject === 'function') return variants.toObject();
    return variants || {};
  }

  async getCart(userId) {
    try {
      const cart = await this.cart
        .findOne({ userId })
        .populate('userId', 'name email');
      if (!cart) {
        // Return empty cart if not found
        return { userId, items: [] };
      }
      return cart;
    } catch (error) {
      throw new Error(`Error fetching cart: ${error.message}`);
    }
  }

  async addItem(userId, itemData) {
    try {
      const { productId, quantity, selectedVariants } = itemData;
      const normalizedSelectedVariants = this.normalizeVariants(selectedVariants);
      let cart = await this.cart.findOne({ userId });

      if (!cart) {
        cart = new this.cart({ userId, items: [] });
      }

      const existingItemIndex = cart.items.findIndex((item) => {
        const itemVariants = this.normalizeVariants(item.selectedVariants);
        return (
          item.productId === productId &&
          JSON.stringify(itemVariants) ===
            JSON.stringify(normalizedSelectedVariants)
        );
      });

      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({
          productId,
          quantity,
          selectedVariants: normalizedSelectedVariants,
        });
      }

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error adding item to cart: ${error.message}`);
    }
  }

  async updateItemQuantity(userId, productId, quantity, selectedVariants = {}) {
    try {
      const normalizedSelectedVariants = this.normalizeVariants(selectedVariants);
      const cart = await this.cart.findOne({ userId });
      if (!cart) throw new Error('Cart not found');

      const itemIndex = cart.items.findIndex((item) => {
        const itemVariants = this.normalizeVariants(item.selectedVariants);
        return (
          item.productId === productId &&
          JSON.stringify(itemVariants) ===
            JSON.stringify(normalizedSelectedVariants)
        );
      });

      if (itemIndex === -1) throw new Error('Item not found in cart');

      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error updating item quantity: ${error.message}`);
    }
  }

  async removeItem(userId, productId, selectedVariants = {}) {
    try {
      const normalizedSelectedVariants = this.normalizeVariants(selectedVariants);
      const cart = await this.cart.findOne({ userId });
      if (!cart) throw new Error('Cart not found');

      cart.items = cart.items.filter((item) => {
        const itemVariants = this.normalizeVariants(item.selectedVariants);
        return !(
          item.productId === productId &&
          JSON.stringify(itemVariants) ===
            JSON.stringify(normalizedSelectedVariants)
        );
      });

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error removing item from cart: ${error.message}`);
    }
  }

  async clearCart(userId) {
    try {
      const cart = await this.cart.findOneAndUpdate(
        { userId },
        { items: [] },
        { new: true, upsert: true },
      );
      return cart;
    } catch (error) {
      throw new Error(`Error clearing cart: ${error.message}`);
    }
  }
}
