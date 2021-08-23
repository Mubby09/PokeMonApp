import React from 'react'
// import PokemonForm from '../components/PokemonForm'
import Pokemon from '../layout/Pokemon'
import FetchPokemon from '../components/FetchPokemon'
import SearchedPokemonDataView from '../components/SearchedPokemonView'


function LikedPokemon(){

    const [searchPokemon, setSearchPokemon] = React.useState(null)
    const likedPokemon = JSON.parse(localStorage.getItem('likedPokemons'))
    
    function handlePreview(search){ 
        
        FetchPokemon( `https://pokeapi.co/api/v2/pokemon/${search}`).then( res => {
          setSearchPokemon(res)
          console.log(res)
        }).catch(error =>  { return `No pokemon bears ${search}`})
      }

     return (
        <div className="pokemon-info-app">
                <h3>LIST OF LIKED POKEMON</h3>
                {                    
                    likedPokemon?.map((pokemon) => <div style={{display : 'flex'}}><SearchedPokemonDataView pokemon={pokemon} /> </div> )                     
                }   
        </div>
     )
}



export default LikedPokemon