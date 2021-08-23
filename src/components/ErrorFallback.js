

function ErrorFallback({error, resetErrorBoundary}) {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    )
  }
  
//   function PokemonErrorBoundary(props) {
//     return <ErrorBoundary FallbackComponent={ErrorFallback} {...props} />
//   }


  export default ErrorFallback