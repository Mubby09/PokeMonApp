import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import  FetchPokemon  from './FetchPokemon'

const formatDate = date =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${String(
    date.getSeconds(),
  ).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}`


// function FetchAllPokemon(url, delay = 500){

//   console.log(url)
//   return window
//     .fetch(`${url}`, {
//             method: 'GET',
//             headers: {
//                 'content-type': 'application/json;charset=UTF-8',
//                 // delay: delay,
//             }
//         }).then(response => {
//             const result = response.json()
//             return result
//         }).catch( err => 'Something went wrong')
// }  





// the delay argument is for faking things out a bit
function SearchPokemon(name, delay = 1500) {
  const pokemonQuery = `
    query PokemonInfo($name: String) {
      pokemon(name: $name) {
        id
        number
        name
        image
        attacks {
          special {
            name
            type
            damage
          }
        }
      }
    }
  `

  return window
    .fetch(`https://graphql-pokemon2.vercel.app/`, {
      // learn more about this API here: https://graphql-pokemon2.vercel.app/
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        delay: delay,
      },
      body: JSON.stringify({
        query: pokemonQuery,
        variables: {name: name?.toLowerCase()},
      }),
    })
    .then( async response => {
      const {data }= await response.json()
      if (response.ok) {
        const pokemon = data?.pokemon
        if (pokemon) {
          pokemon.fetchedAt = formatDate(new Date())
          return pokemon
        } else {
          return 
          // Promise.reject(new Error(`No pokemon with the name "${name}"`))
        }
      } else {
        // handle the graphql errors
        const error = {
          message: data?.errors?.map(e => e.message).join('\n'),
        }
        return Promise.reject(error)
      }
    })
}

function PokemonInfoFallback({name}) {
  const initialName = React.useRef(name).current
  const fallbackPokemonData = {
    name: initialName,
    number: 'XXX',
    image: '/img/pokemon/fallback-pokemon.jpg',
    attacks: {
      special: [
        {name: 'Loading Attack 1', type: 'Type', damage: 'XX'},
        {name: 'Loading Attack 2', type: 'Type', damage: 'XX'},
      ],
    },
    fetchedAt: 'loading...',
  }
  return <PokemonDataView pokemon={fallbackPokemonData} />
}

function PokemonDataView({pokemon, preview}) {

  const [ getData, setGetData] = React.useState(null)

  React.useEffect(() => {
    SearchPokemon(pokemon?.name).then(res => {
      setGetData(res)
    })
  }, [])

  function handleLikedButton(e){
    
    const likedPokemon = JSON.parse(localStorage.getItem('likedPokemons')) || [];
      likedPokemon.push(pokemon);
      localStorage.setItem('likedPokemons', JSON.stringify(likedPokemon))
      e.target.disabled = true
  }
 
  // console.log(pokemon)
  return (
    <div className='container_wrap'>
      <div className="pokemon-info__img-wrapper">
        <img src={getData?.image} alt={pokemon?.name} />
      </div>
      <section>
        <h2 onClick={handleLikedButton}>
          {pokemon?.name}
          { '  '}
          <button  style={{ marginLeft: '100'}} type="submit" >
          Like
        </button>
        </h2>
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

  const fetchLikedPokemon = JSON.parse(localStorage.getItem('likedPokemons'))


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
          <button type="button" onClick={() => getLikedPokemon(fetchLikedPokemon)} >
            See liked Pokemon
          </button>
        </span>

      </div>
    </form>
  )
}

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function PokemonErrorBoundary(props) {
  return <ErrorBoundary FallbackComponent={ErrorFallback} {...props} />
}


function SearchedPokemon({pokemon}) {

  const [ getData, setGetData] = React.useState(null)
  console.log(pokemon)

  React.useEffect(() => {
    SearchPokemon(pokemon?.name).then(res => {
      setGetData(res)
    }).catch( () => 'Pokemon search name is not in the list') 
  }, [pokemon])


    return (
      <div>
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

export {
  SearchedPokemon,
  // FetchAllPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
  SearchPokemon,
  PokemonErrorBoundary,
}
