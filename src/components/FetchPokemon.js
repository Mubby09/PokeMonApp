


function FetchPokemon(url, delay = 500){

    console.log(url)
    return window
      .fetch(`${url}`, {
              method: 'GET',
              headers: {
                  'content-type': 'application/json;charset=UTF-8',
                  // delay: delay,
              }
          }).then(response => {
              const result = response.json()
              return result
          }).catch( err => 'Something went wrong')
  }  
  
  
  export default FetchPokemon