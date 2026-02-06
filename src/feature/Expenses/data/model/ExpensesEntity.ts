/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
// expenses.schema.ts
import { model, Schema } from 'mongoose';

export const ExpenseSchema = new Schema(
  {
    category: {
      type: String,
      enum: [
        'ELECTRICITY',
        'INTERNET',
        'RENT',
        'SALARY',
        'REPAIR',
        'EQUIPMENT',
        'OTHER',
        'CONTROLLER',
        'MAINTENANCE',
      ],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    note: {
      type: String,
    },

    createdAt: {
      type: Date,
      default: Date.now,
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
  { timestamps: true },
);
ExpenseSchema.pre<any>(/^find/, function() {
  if (this._conditions.isDeleted == true) {
    this.find({ isDeleted: { $ne: false } });
  } else {
    this.find({ isDeleted: false });
  }
});
export const ExpenseEntity = model('Expense', ExpenseSchema);
