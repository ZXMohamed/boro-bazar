import CartService from './cart.service.js';

export default class CartController {
  constructor() {
    this.cartService = new CartService();
  }

  async getCart(req, res) {
    try {
      const userId  = req.user.id; // Assuming userId from params or auth middleware
    
      const cart = await this.cartService.getCart(userId);
      res.status(200).json({
        success: true,
        data: cart,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async addToCart(req, res) {
    try {
      const userId = req.user.id;
      const itemData = req.body;
      const cart = await this.cartService.addItem(userId, itemData);
      res.status(201).json({
        success: true,
        message: 'Item added to cart',
        data: cart,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateCartItem(req, res) {
    try {
      const userId = req.user.id;
      const { productId } = req.params;
      const { quantity, selectedVariants } = req.body;
      const cart = await this.cartService.updateItemQuantity(
        userId,
        productId,
        quantity,
        selectedVariants,
      );
      res.status(200).json({
        success: true,
        message: 'Cart item updated',
        data: cart,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async removeFromCart(req, res) {
    try {
      const userId = req.user.id;
      const { productId } = req.params;
      const { selectedVariants } = req.body;
      const cart = await this.cartService.removeItem(
        userId,
        productId,
        selectedVariants,
      );
      res.status(200).json({
        success: true,
        message: 'Item removed from cart',
        data: cart,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async clearCart(req, res) {
    try {
      const userId = req.user.id;
      const cart = await this.cartService.clearCart(userId);
      res.status(200).json({
        success: true,
        message: 'Cart cleared',
        data: cart,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
