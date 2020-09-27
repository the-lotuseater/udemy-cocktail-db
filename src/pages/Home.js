import React from "react";
import CocktailsList from '../components/CocktailList';
import SearchForm from '../components/SearchForm'
import axios from 'axios';

export default function Home() {
  const [loading, setLoading] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('a');
  const [cocktails, setCocktails] = React.useState([])

  //user effect runs after each render.
  React.useEffect(()=>{
      setLoading(true);
      async function getDrinks(){
        try{
          const data = null;
          axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`).then(response =>{
            data = response.json;
          });
          const {drinks} = data;
          if(drinks){
            const newCocktails = drinks.map(cocktail => {
              const{idDrink, strDrink,strDrinkThumb,strAlcoholic,strGlass} = cocktail;
              return {id:idDrink, name:strDrink, image:strDrinkThumb,info:strAlcoholic,glass:strGlass};
            });
            setCocktails(newCocktails);
          }
          else
            setCocktails([]);
        }
        catch(error){
          console.log(error);
        }
        setLoading(false);
      }
      getDrinks();
    },[searchTerm]);

  return (<main> 
          <SearchForm  setSearchTerm = {setSearchTerm}></SearchForm>
          <CocktailsList loading={loading} cocktails = {cocktails}></CocktailsList>
        </main>);
}