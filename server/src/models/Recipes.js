import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({ //schema defines structe of our data
    name: {type: String,required: true,},
    ingredients: [{    //array of strings since it is an array we put []
        type: String,
        required: true,
    }],
    imageUrl : {type: String, required: true},
    instruction: {type: String, required: true},
    cookingTime: {type: Number, required: true},
    userOwner:{type:mongoose.Schema.Types.ObjectId, ref:'users', required:true}
});

export const RecipeModel = mongoose.model('recipes', RecipeSchema); //there is a table or collection callled users in our database