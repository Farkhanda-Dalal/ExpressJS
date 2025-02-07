- ## 1. CREATE CLUSTER
- ## 2. ADD CLUSTER CONNECTION:
  - Create .env file
  - Add Cluster String to a variable
  - Import `import dotenv from 'dotenv';` to index.js
  - Put `dotenv.config();` in index.js
- ## 3. CONNECT TO MONGO ATLAS:
  ```
  mongoose.connect(process.env.MONGO_URL)
  .then(()=>console.log("Database Connection Established"))
  .catch((err)=>console.log("Database Connection Failed",err))
  ```
- ## 4. CREATE SCHEMA:
    - Create model folder
    - Import:
      ```
      import { Schema } from "mongoose";
      import mongoose from "mongoose";
      ```
    - Create Schema Obj like:
      ```
      const userSchema=new Schema({
          role:String,
          fname:String,
          lname:String,
          phone:{
              type: String,
              unique: String
          },
          password:String
      
      })
      ```
    - ```const User=mongoose.model('User',userSchema);```
    - Export model obj

      ```
