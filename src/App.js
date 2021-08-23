
import * as React from 'react'
import Home from './page/Home'
import LikedPokemon from './page/LikedPokemon'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"



function App() {

  return (
    <Router>
       <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/search">
            {/* <Users /> */}
          </Route>
          <Route path="/liked-pokemon">
            <LikedPokemon />
          </Route>
        </Switch>
    </Router>

  )
}

export default App





       