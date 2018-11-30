import * as mongoose from 'mongoose';


export const blogSchema = new mongoose.Schema({
    blog_title: String,
    blog_desc: String,
    created_by:{type: mongoose.Schema.Types.ObjectId, ref: 'userData'}
} ,{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});