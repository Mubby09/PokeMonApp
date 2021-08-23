import React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import PokemonInfo from './PokemonInfo'
import ErrorFallback from '../components/ErrorFallback'

 function Pokemon({name, url, preview}){

    const [pokemonName, setPokemonName] = React.useState('')

    function handleReset() {
        setPokemonName('')
    }

    return (
      <div className="pokemon-info" style={{display: 'inline-block'}}>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={handleReset}
            resetKeys={[pokemonName]}
          >
          {/* pokemon */}
            <PokemonInfo preview={preview} pokemonName={name} pokemonUrl={url} />
          </ErrorBoundary>
          
      </div>
    )
  }
 

  export default Pokemon