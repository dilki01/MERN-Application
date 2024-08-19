import {useState} from 'react';
import axios from 'axios';
import {useEffect} from 'react';
import { useGetUserID } from '../hooks/useGetUserID';


export const SavedRecipes =()=>{
    const [savedRecipes,setSavedRecipes] = useState([]);

    const userID = useGetUserID();

    useEffect( ()=> {

        const fetchSavedRecipes = async()=>{ //for recipes/getSavedRecipes get al ids endpoint
            try{                            //endpoint gets userID
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`); //we put userID in the endpoint
                setSavedRecipes(response.data);
                console.log("list of ids all saved recipes for display");
                console.log(response.data);
            }catch(error){
                console.log(error);
            }
        };


        fetchSavedRecipes();
    },[]);


    return <div>
        <h1>Saved Recipes</h1>
        <ul>
            {
                savedRecipes.map(recipe=>(
                    <li key={recipe._id}>
                        {/* {savedRecipes.includes(recipe._id) && <p>Already Saved</p>} */}
                        <div>
                            <h2>{recipe.name}</h2>
                            <p>{recipe._id}</p>
                            {/* <p>{isRecipeSaved(recipe._id)}</p> */}
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