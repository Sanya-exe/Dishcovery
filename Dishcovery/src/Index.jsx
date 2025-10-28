import React from "react"
import IngredientLists from "./components/ingredientLists.jsx"  
import ClaudeRecipe from "./components/claudeRecipe.jsx"
import { getRecipeFromMistral } from "./ai.js"

export default function Index(){
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const recipeSection = React.useRef(null)

    React.useEffect(() => {
        if(recipe !== "" && recipeSection.current !== null){
            //recipeSection.current.scrollIntoView()
            const yCoord = recipeSection.current.getBoundingClientRect().top
            window.scroll({
                top: yCoord, 
                behavior: "smooth"
        })
    }
    }, [recipe])

    async function getRecipe(){
       const RecipeMarkdown = await getRecipeFromMistral(ingredients)
         setRecipe(RecipeMarkdown)
    }

    function addIngredient(formData){
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return(
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input 
                 aria-label="Add ingredient" 
                 type="text"
                 placeholder="e.g oregano" 
                 name="ingredient"
                 />
                 <button>Add Ingredient</button>
            </form>

            {ingredients.length > 0 && 
            <IngredientLists
            ref={recipeSection}
             ingredients={ingredients}
            getRecipe={getRecipe}
            />
 }  
        {recipe && <ClaudeRecipe recipe={recipe}/>}
        </main>
    ) 
}