import express from "express";
// import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

//fetch all the reccipes in home page
router.get("/", async (req, res) => {
    try {
        const response = await RecipeModel.find({});  //we can put conditions here inside {} brackets.in here since thre is no condition simply put{}
        res.json(response);
    } catch (error) {
        res.status(500).send(error);
    }
});

//create a new recipe
router.post("/",
    verifyToken, 
    async (req, res) => {
    const recipe = new RecipeModel(req.body)
    try {
        const response = await recipe.save();
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

//save recipes
router.put("/"
    ,verifyToken
    ,async(req,res)=>{
    try{
        const recipe = await RecipeModel.findById(req.body.recipeID); //find the recipes from recipe table that using recipe id that came with req
        const user = await UserModel.findById(req.body.userID);  //find the user from user table that using user id that came with req
        user.savedRecipes.push(recipe); //push the recipe to the savedRecipes array in user table
        await user.save(); //save the user
        res.json({savedRecipes: user.savedRecipes}); //send the savedRecipes array to the frontend
        // res.json("Recipe Saved",recipe,user);
    }catch(error){
        res.json(error);
        // res.json("Error Occured");
    }
})

//get all saved recipes get only the ids
router.get("/savedRecipes/ids/:userID",async(req,res)=>{
    try{
        const user = await UserModel.findById(req.params.userID);
        res.json({savedRecipes: user?.savedRecipes}); //we put question mark here to avoid the error if savedrecipes is null
    }catch(error){
        res.json(error);
    }
});

//get saved recipes whole recipe
router.get("/savedRecipes/:userID",async(req,res)=>{
    try{

        const user = await UserModel.findById(req.params.userID); //get the user id
        const savedRecipes = await RecipeModel.find({
            _id:{$in : user.savedRecipes}, //find the recipes that are in the users' savedRecipes array 
        })
        res.json(savedRecipes);
    }
        catch(error){
            res.json(error);
        }
});


export {router as recipesRouter};