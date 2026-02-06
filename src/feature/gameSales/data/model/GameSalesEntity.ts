// game-sales.schema.ts
import { model, Schema } from 'mongoose';
export const GameSaleSchema = new Schema(
  {
    consoleId: {
      type: String,
      enum: ['PS4-1', 'PS4-2', 'PS4-3', 'PS4-4'],
      required: true,
    },

    gamesPlayed: {
      type: Number,
      required: true,
      min: 1,
    },

    pricePerGame: {
      type: Number,
      default: 10,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ['CASH', 'MOBILE'],
      required: true,
    },

    recordedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
GameSaleSchema.pre<any>(/^find/, function() {
  if (this._conditions.isDeleted == true) {
    this.find({ isDeleted: { $ne: false } });
  } else {
    this.find({ isDeleted: false });
  }
});
export const GameSaleEntity = model('GameSale', GameSaleSchema);
