// import { set } from 'mongoose';
import {useState} from 'react';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';


export const CreateRecipe =()=>{
    const userID = useGetUserID();
    
    const[recipe,setRecipe] = useState({
        name:"",
        ingredients:[],
        instruction:"",
        imageUrl:"",
        cookingTime:0,
        userOwner:userID,
    });

    const [ cookies,] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const handlechange=(event)=>{
        const {name,value} = event.target;
        setRecipe({...recipe,[name]:value});
    };

    const addIngredient=()=>{
        setRecipe({...recipe,ingredients:[...recipe.ingredients,""]});
    }

    const handleIngredientChange=(event,index)=>{
        const {value} = event.target;
        const ingredients   = recipe.ingredients;
        ingredients[index] = value;
        setRecipe({...recipe,ingredients});
    }


    const onSubmit = async(event)=>{
        console.log(recipe);
        event.preventDefault();
        try{
            await axios.post("http://localhost:3001/recipes", recipe ,{headers:{ Authorization: cookies.access_token}});
            alert("Recipe Created");
            navigate('/');
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className="create-recipe">
            <h2>Create Recipe</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" onChange={handlechange}/>

                <label htmlFor="ingredients">Ingredients</label>
                {recipe.ingredients.map((ingredient,index)=>(
                    <input
                        key={index}
                        type='text'
                        name='ingredients'
                        value={ingredient}
                        onChange={(event)=>handleIngredientChange(event,index)}
                    />
                ))}
                <button onClick={addIngredient}type='button'>
                    Add Ingredient
                </button>
                

                <label htmlFor="instruction">Instructions</label>
                <textarea id="instruction" name="instruction" onChange={handlechange}></textarea>

                <label htmlFor="imageUrl">Image URL</label>
                <input type="text" id="imageUrl" name="imageUrl" onChange={handlechange}/>

                <label htmlFor="cookingTime">Cooking Time (minutes) </label>
                <input type="number" id="cookingTime" name='cookingTime' onChange={handlechange}/>

                <button type='submit'>Create Recipe</button>
            </form>
        </div>
    );
};