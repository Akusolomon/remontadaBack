
export interface Hash {

  // Generates the salt using whatever algorithm the concret class will use
  generateSalt(): Promise<string>;

  // Hashs the data and returns the hashed string
  hash(data: string, salt: string) : Promise<string>;
  
  // checks if the new data matches after being hashed 
  isHashed(data: string, hashed: string, salt: string) : Promise<boolean>;

}