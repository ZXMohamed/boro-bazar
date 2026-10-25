import { Router } from 'express';
import CartController from './cart.controller.js';
import { protect } from '../middleware/authmiddleware.js';

export const cartRouter = Router();
const cartController = new CartController();
cartRouter.use(protect);

// Get cart for user
cartRouter.get('/:userId', cartController.getCart.bind(cartController));

// Add item to cart
cartRouter.post('/:userId', cartController.addToCart.bind(cartController));

// Update cart item
cartRouter.put(
  '/:userId/:productId',
  cartController.updateCartItem.bind(cartController),
);

// Remove item from cart
cartRouter.delete(
  '/:userId/:productId',
  cartController.removeFromCart.bind(cartController),
);

// Clear cart
cartRouter.delete('/:userId', cartController.clearCart.bind(cartController));

export default cartRouter;
