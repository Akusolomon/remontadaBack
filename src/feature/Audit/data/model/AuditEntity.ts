// audit-log.schema.ts
import { model, Schema } from "mongoose";

export const AuditLogSchema = new Schema(
  {
    entity: {
      type: String,
      enum: ["GAME_SALE", "EXPENSE"],
      required: true,
    },

    entityId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    action: {
      type: String,
      enum: ["CREATE", "UPDATE", "DELETE"],
      required: true,
    },

    performedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    before: {
      type: Object,
    },

    after: {
      type: Object,
    },
                          
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: false }
);
export const AuditEntity = model("AuditLog", AuditLogSchema);