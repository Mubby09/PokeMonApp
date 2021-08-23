import React from 'react'
import FetchPokemon from '../components/FetchPokemon';
import PokemonInfoFallback from '../components/PokenInfoFallback';
import PokemonDataView from '../components/PokemonDataView';


function PokemonInfo({pokemonUrl, pokemonName, preview}) {
  const [state, setState] = React.useState({
    status: pokemonUrl ? 'pending' : 'idle',
    pokemon: null,
    error: null,
  })

  const {status, pokemon, error} = state;

  React.useEffect(() => {
    if (!pokemonUrl) {
          return 
        }
    setState({status: 'pending'})  
    FetchPokemon(`${pokemonUrl}`).then(result => {
      setState((state) => ({ ...state, status: 'resolved', pokemon: result }))
    }).catch( err => {
      setState((state) => ({ ...state, status: 'rejected', error: err }))
    })
  }, [])


   if (status === 'idle') {
    return 
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    // this will be handled by an error boundary
    throw error
  } else if (status === 'resolved') {
    return <PokemonDataView preview={preview} pokemon={pokemon} />
  }

  throw new Error('This should be impossible')

} 


export default PokemonInfo