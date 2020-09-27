import React from "react";
import Cocktail from './Cocktail';

export default function CocktailList({cocktails,loading}) {
  if(loading){
    return <h1 className="section-title">Loading...</h1>;
  }
  if(cocktails.length<1)
    return <h1 className="section-title">No cocktails matched with your query...</h1>;

    return (<section className="section">
            <h2 className="section-title">cocktails</h2>
              <div className="cocktails-center">{
                cocktails.map(item => {
                  return <Cocktail key={item.id}{...item}></Cocktail>
                })
              }</div>
      </section>);
}
