import {useState} from 'react';
import axios from 'axios';
import {useEffect} from 'react';
import { useGetUserID } from '../hooks/useGetUserID';
import {useCookies} from 'react-cookie';

export const Home =()=>{
    const [recipes,setRecipes] = useState([]);
    const [savedRecipes,setSavedRecipes] = useState([]);
    const [ cookies,] = useCookies(["access_token"]);

    const userID = useGetUserID();

    useEffect( ()=> {
        const fetchRecipes = async()=>{
            try{
                const response = await axios.get("http://localhost:3001/recipes" );
                setRecipes(response.data);
                console.log(response.data);
            }catch(error){
                console.log(error);
            }
        };

        const fetchSavedRecipes = async()=>{ //for recipes/getSavedRecipes get al ids endpoint
            try{                            //endpoint gets userID
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`); //we put userID in the endpoint
                setSavedRecipes(response.data.savedRecipes);
                console.log("list of ids all saved recipesssssss");
                console.log(response.data.savedRecipes);
            }catch(error){
                console.log(error);
            }
        };

        fetchRecipes();
        if(cookies.access_token){
        fetchSavedRecipes();
        }
    },[]);

    const saveRecipe = async(recipeID)=>{ //saving recipe
        try { //in saveRecipe PUT endpoint we return user.saveRecipes array
            const response = await axios.put("http://localhost:3001/recipes",{recipeID,userID } ,{headers:{ Authorization: cookies.access_token}}
                // ,{headers:{authorization : cookies.access_token}}
            ); //endpoint gets 2 prperties which are userID and recipeID
            setSavedRecipes(response.data.savedRecipes);  //once click on save button without refreshing page button will uodate
            console.log("verify tokennnnnnnnn",cookies.access_token);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const isRecipeSaved = (recipeid)=>savedRecipes.includes(recipeid); //this returns either true or false

    return <div>
        <h1>Recipes</h1>
        <ul>
            {
                recipes.map(recipe=>(
                    <li key={recipe._id}>
                        {/* {savedRecipes.includes(recipe._id) && <p>Already Saved</p>} */}
                        <div>
                            <h2>{recipe.name}</h2>
                            <p>{recipe._id}</p>
                            {/* <p>{isRecipeSaved(recipe._id)}</p> */}
                            <button 
                                onClick={()=>saveRecipe(recipe._id)}
                                disabled={isRecipeSaved(recipe._id)}  //if recipe is already saved disab;e the button
                            >
                                {/* save */}
                                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                            </button>
                        </div>
                        <div className='instructions'>
                            <p>{recipe.instruction}</p>
                        </div>
                        <img src={recipe.imageUrl} alt={recipe.name}/>
                        {/* <img src="https://a.omappapi.com/users/fe433c0f6505/images/6625311945e01723482315-NAT-2024BackToSchool-DT-IMG-02.jpg?width=495" alt={recipe.name} /> */}
                        <p>Cooking TIme : {recipe.cookingTime} (minutes)</p>
                    </li>
                )
            )
            }
        </ul>
    </div>
};