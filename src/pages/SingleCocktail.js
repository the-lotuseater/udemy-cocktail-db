import React from "react";
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function SingleCocktail() {
  const {id} = useParams();
  const [loading, setloading]=React.useState(false);
  const [cocktail, setCockTail] = React.useState(null);

  React.useEffect(()=>{
    setloading(true);
    async function getCocktail(){
      try{
        const data = null;
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then(response =>{data = response.json});
          if(data.drinks){
            const {strDrink:name,strDrinkThumb:image,strGlass:glass,strAlcoholic:info,strCategory:category,strInstructions:instructions,strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5} = data.drinks[0]
            const ingredients = [strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5];
            const newCocktail = {name,image,info,category,glass,instructions,ingredients};
            setCockTail(newCocktail);
          }
          else{
            setCockTail(null);
          }
      }
    catch(error){
      console.log(error);
    }
      setloading(false);
  }
  getCocktail();
  },[id]);
  if(loading)
    return <h2 className="section-title">Loading...</h2>
  if(!cocktail)
    return <h2 className="section-title">No Cocktail found...</h2>
  else{
    const {name,image,category,info,glass,instructions,ingredients} = cocktail;
    return (<section className="section cocktail-section">
              <Link to="/" className="btn btn-primary">Take Home</Link>
              <h2 className="section-title">{name}</h2>
              <div className="drink">
                <img src={image} alt={name}></img>
                <div className="drink-info">
                    <p>Name: {name}</p>
                    <p>Category: {category}</p>
                    <p>Info: {info}</p>
                    <p>Glass: {glass}</p>
                    <p>Instructions: {instructions}</p>
                    <p>  { ingredients.map((item,index)=>{ return item ? <span key={index}>{item},</span> : null}) } </p>
                </div>
              </div>
            </section>);
  }
}