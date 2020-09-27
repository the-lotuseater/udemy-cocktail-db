import React from "react";

export default function SearchForm({ setSearchTerm}) {

  const searchValue = React.useRef('');

  React.useEffect(() => {
    searchValue.current.focus();
  }, []);

  //used to stop page from refreshing on pressing enter
  const suppressSubmit = (e) => {
    e.preventDefault();
  }

  const searchCocktail = () => {
    console.log(searchValue.current.value);
    setSearchTerm(searchValue.current.value);
  }

  return (
          <section className="section">
            <form className="form search-form" onSubmit={suppressSubmit}>
              <div className="form-control">
                <label htmlFor="name">Search For a Cocktail</label>
                <input type="text" name="name" id="name" onChange={searchCocktail} ref={searchValue}></input>
              </div>
            </form>
          </section>
        );
}
