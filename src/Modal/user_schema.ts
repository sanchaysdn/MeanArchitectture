import * as mongoose from 'mongoose';


export const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String

   
} ,{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});