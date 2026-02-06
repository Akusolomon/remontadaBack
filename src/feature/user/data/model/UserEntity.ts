import { Schema,model } from "mongoose";
import * as bcrypt from 'bcrypt';

export const UserSchema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
},  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },);
  UserSchema.pre<any>('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
  // this.confirmPassword = undefined
});
UserSchema.pre<any>(/^find/, function() {
  if (this._conditions.isActive == false) {
    this.find({ isActive: { $ne: true } });
  } else {
    this.find({ isActive: { $ne: false } });
  }
});

UserSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
export const UserEntity = model('User', UserSchema);