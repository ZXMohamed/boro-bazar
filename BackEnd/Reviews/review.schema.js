import mongoose, { Schema, model } from 'mongoose';

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  { timestamps: true }
);

reviewSchema.index({ reviewer: 1, productId: 1 }, { unique: true });

const Review = mongoose.models.Review || model('Review', reviewSchema);

export default Review;
