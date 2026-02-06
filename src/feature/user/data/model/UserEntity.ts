import { Schema,model } from "mongoose";
import * as bcrypt from 'bcrypt';

import { CallbackWithoutResultAndOptionalError} from "mongoose";
export const UserSchema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
},  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },);
  UserSchema.pre<any>('save', async function(next:CallbackWithoutResultAndOptionalError) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  // this.confirmPassword = undefined
});
UserSchema.pre<any>(/^find/, function(next:CallbackWithoutResultAndOptionalError) {
  if (this._conditions.isActive == false) {
    this.find({ isActive: { $ne: true } });
    next();
  } else {
    this.find({ isActive: { $ne: false } });
    next();
  }
});

UserSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
export const UserEntity = model('User', UserSchema);