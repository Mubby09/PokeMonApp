import React from "react"
import SearchPokemon from "./SearchPokemon"


function SearchedPokemonDataView({pokemon}) {

    const [ getData, setGetData] = React.useState(null)
    console.log(pokemon)
  
    React.useEffect(() => {
      SearchPokemon(pokemon?.name).then(res => {
        setGetData(res)
      }).catch( () => 'Pokemon search name is not in the list') 
    }, [pokemon])
  
  
      return (
        <div style={{display: 'inline'}}>
          <div className="pokemon-info__img-wrapper">
            <img src={getData?.image} alt={pokemon?.name} />
          </div>
          <section>
            <h2>
              {pokemon?.name}
              <sup>{pokemon?.id}</sup>
            </h2>
          </section>
          <section>
            <ul>
              <h4>Ability</h4>
              {pokemon?.abilities?.map(({ability}) => (
                <li key={ability?.name}>
                  <label>{ability?.name}</label>
                  <span>
                    {} <small>Ability</small>
    
                  </span>
                </li>
              ))}
              <h4>Base Experience</h4>
              <p>{pokemon?.base_experience}</p>
              <h4>Moves</h4>
              <p>{pokemon?.moves?.length}</p>
              <h4>Weight</h4>
              <p>{pokemon?.weight}</p>
            </ul>
          </section>
          <small className="pokemon-info__fetch-time">{getData?.fetchedAt}</small>
        </div>
    )
  }


  export default SearchedPokemonDataView