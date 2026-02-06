import * as bcrypt from 'bcrypt';
import { Hash } from './Hash';

export class Hasher implements Hash {

  async generateSalt(): Promise<string> {
    return await bcrypt.genSalt();
  }

  async hash(data: string, salt: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(data, salt);
    return hashedPassword;
  }

  async isHashed(data: string, original:string, salt: string) : Promise<boolean> {
    const hashedPassword = await this.hash(data, salt);
    return hashedPassword === original;
  }

}