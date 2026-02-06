import { AuthenticatedUser } from 'src/feature/user/domain/AuthenticatedUser';
import { ForbiddenException } from '../exception/ForbiddenException';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export function Role(roles: string[]): any {
  return (target: any, key: string, descriptor: any) => {
    const original = descriptor.value;
    
    descriptor.value = function(...args: any[]) {
      
      // Authorization code goes here
      const user = AuthenticatedUser.getInstance();
      let roleFound = false;
      roles.forEach(r => {
        if (r.toUpperCase() === user.role) {
          roleFound = true;
        }
      });
      if (!roleFound) {
        throw new ForbiddenException('Authorization Failed!');
      }
      // Call the original method
      const result = original.apply(this, args);
      // Return the result
      return result;
    };
    return descriptor;
  };
}
