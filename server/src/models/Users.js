import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ //schema defines structe of our data
    username: {type: String, required: true, unique: true,},
    password: {type: String, required: true, },
    savedRecipes : [{type:mongoose.Schema.Types.ObjectId, ref:'recipes'}],

});

export const UserModel = mongoose.model('users', userSchema); //there is a table or collection callled users in our database