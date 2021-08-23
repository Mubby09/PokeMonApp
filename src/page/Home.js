import React from 'react'
import Pagination from "react-js-pagination";
import Pokemon from '../layout/Pokemon';
import SearchedPokemonDataView from '../components/SearchedPokemonView';
import PokemonForm from '../components/PokemonForm';
import FetchPokemon from '../components/FetchPokemon'



function Home(params) {

    const [pokemonName, setPokemonName] = React.useState('')
    const [pokemons, setPokemons] = React.useState({})
    const [searchPokemon, setSearchPokemon] = React.useState(null)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [updatePage, setUpdatePage] = React.useState(1)
  
    function handleSubmit(newPokemonName) {
      setPokemonName(newPokemonName)
    }
  
    React.useEffect(() => {
      if(currentPage < updatePage){   
        FetchPokemon(`${pokemons?.next}`).then( res => {
          console.log(pokemons)
          setPokemons(res)
        })
        setUpdatePage(updatePage)
      }
      else if(currentPage > updatePage){
        FetchPokemon(`${pokemons?.prev}`).then( res => {
          setPokemons(res) 
        })
        setUpdatePage(updatePage)
      }
      else {
        FetchPokemon(`https://pokeapi.co/api/v2/pokemon`).then(res => {
          setPokemons(res)
        })
      setCurrentPage(updatePage)
    }
  
    }, [updatePage])
  
  
    // handlers
    function getSearch(search){
      console.log(search)
      setSearchPokemon(search) 
    }
  
    function handlePageChange(pageNum){
      setUpdatePage(pageNum)   
      console.log(pageNum)
    }
  
    function handlePreview(search){ 
        
      FetchPokemon( `https://pokeapi.co/api/v2/pokemon/${search}`).then( res => {
        setSearchPokemon(res)
        console.log(res)
      }).catch(error =>  { return `No pokemon bears ${search}`})
    }
  
    // function getLikedPokemon(likedPokemon){
    //   setLikedPokemon(likedPokemon)
    //   console.log(likedPokemon)
    // }
  
    console.log(pokemons)

    return(
        <div className="pokemon-info-app">
            <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} getSearch={getSearch}  />
            <hr />
            <div >
                {   
                    searchPokemon ?   
                    <SearchedPokemonDataView pokemon={searchPokemon} />
                    :               
                    pokemons?.results?.map(({name, url}) =>  <Pokemon preview={handlePreview} name={name} url={url} key={name} /> ) 
                    
                }
                <div style={{marginLeft : '100px'}}>
                    <Pagination
                    activePage={updatePage}
                    itemsCountPerPage={20}
                    totalItemsCount={pokemons?.count}
                    pageRangeDisplayed={2}
                    onChange={handlePageChange}
                    />
                </div>  
            </div>     
        </div>
    )
}


export default Home