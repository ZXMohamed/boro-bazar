import mongoose from 'mongoose';
const { Schema } = mongoose;

const cartItemSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  selectedVariants: {
    type: Map,
    of: String,
    default: {},
  },
});

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Cart', cartSchema);
