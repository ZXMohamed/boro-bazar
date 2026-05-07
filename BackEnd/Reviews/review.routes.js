import { Router } from 'express';
import {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
} from './review.controller.js';
import { protect } from '../middleware/authmiddleware.js';

const router = Router();

/////////////////(CreateReview)\\\\\\\\\\\\\\\\\\\
router.post('/', protect, createReview);

/////////////////(GetReviews)\\\\\\\\\\\\\\\\\\\\\
router.get('/', getReviews);

/////////////////(UpdateReview)\\\\\\\\\\\\\\\\\\\
router.patch('/:reviewId', protect, updateReview);

/////////////////(DeleteReview)\\\\\\\\\\\\\\\\\\\
router.delete('/:reviewId', protect, deleteReview);

export default router;
