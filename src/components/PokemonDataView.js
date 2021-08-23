import React from "react"
import SearchPokemon from "./SearchPokemon"


function PokemonDataView({pokemon, preview}) {

    const [ getData, setGetData] = React.useState(null)
    const [likedPokemon, setLikedPokemon] = React.useState(null)
  
    React.useEffect(() => {
      SearchPokemon(pokemon?.name).then(res => {
        setGetData(res)
      })
    }, [])
  
    function handleLikedButton(e){ 
          const likedPokemons = JSON.parse(localStorage.getItem('likedPokemons')) || [];
          likedPokemons.push(pokemon);
          localStorage.setItem('likedPokemons', JSON.stringify(likedPokemons))
          e.target.disabled = true
    
    }
    function getValue(e) {
      preview(e?.target?.innerText)
    }
   
    // console.log(pokemon)
    return (
      <div className='container_wrap'>
        <div className="pokemon-info__img-wrapper">
          <img src={getData?.image} alt={pokemon?.name} />
        </div>
        <section >
          <h2  onClick={ getValue }>
            {pokemon?.name}
            { '  '}
          </h2>
          <button onClick={handleLikedButton} type="submit" >
            Like
          </button>
        </section>
        <section>
          <ul>
            <h4>Ability</h4>
            {pokemon?.abilities?.map(({ability}) => (
              <li key={ability?.name}>
                <label>{ability?.name}</label>
                <span>
                  {/* {} <small>Ability</small> */}
  
                </span>
              </li>
            ))}
  
            {/* <h4>Base Experience</h4>
            <p>{pokemon?.base_experience}</p>
            <h4>Moves</h4>
            <p>{pokemon?.moves?.length}</p>
            <h4>Weight</h4>
            <p>{pokemon?.weight}</p> */}
          </ul>
        </section>
        <small className="pokemon-info__fetch-time">{getData?.fetchedAt}</small>
      </div>
    )
  }


  export default PokemonDataView