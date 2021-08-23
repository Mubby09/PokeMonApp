import React from "react"
import FetchPokemon from "./FetchPokemon"
import {Link} from 'react-router-dom'

function PokemonForm({
    pokemonName: externalPokemonName,
    initialPokemonName = externalPokemonName || '',
    onSubmit,
    getSearch,
    getLikedPokemon
  }) {
    const [pokemonName, setPokemonName] = React.useState('')
    React.useEffect(() => {
      if (typeof externalPokemonName === 'string') {
        setPokemonName(externalPokemonName)
      }
    }, [externalPokemonName])
  
    function handleChange(e) {
      setPokemonName(e.target.value)
      console.log(e.target.value)
    }
  
    function handleSubmit(e) {
      e.preventDefault()
      FetchPokemon( `https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then( res => {
        getSearch(res)
        console.log(res)
      }).catch(error =>  { return `No pokemon bears ${pokemonName}`})
      // onSubmit(pokemonName)
    }
  
    function handleSelect(newPokemonName) {
      setPokemonName(newPokemonName)
      onSubmit(newPokemonName)
    }
    
  
    return (
      <form onSubmit={handleSubmit} className="pokemon-form">
        <label htmlFor="pokemonName-input">Pokemon Name</label>
        <small>
          Try{' '}
          <button
            className="invisible-button"
            type="button"
            onClick={() => handleSelect('pikachu')}
          >
            "pikachu"
          </button>
          {', '}
          <button
            className="invisible-button"
            type="button"
            onClick={() => handleSelect('charizard')}
          >
            "charizard"
          </button>
          {', or '}
          <button
            className="invisible-button"
            type="button"
            onClick={() => handleSelect('mew')}
          >
            "mew"
          </button>
        </small>
        <div>
          <input
            className="pokemonName-input"
            id="pokemonName-input"
            name="pokemonName"
            placeholder="Pokemon Name..."
            value={pokemonName}
            onChange={handleChange}
          />
          <button type="submit" disabled={!pokemonName.length}>
            Submit
          </button>
  
          <span className="space-out">
            <Link to='/liked-pokemon'>
              <button type="button" >
                See liked Pokemon
              </button>
            </Link>
          </span>
  
        </div>
      </form>
    )
  }
  

  export default PokemonForm