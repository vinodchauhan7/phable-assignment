import React from 'react';
import PokemonContext from './utils/context';
import {pokemonStore,InitialState} from './utils/reducer';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import ShowPokemons from './components/show-pokemons/show-pokemons.component';
import AddPokemon from './components/add-pokemon/add-pokemon.component';
import './App.css';


function App() {
  const [store,pokemonDispatch] = React.useReducer(pokemonStore,InitialState);
  return (
    <div className="App">
      <h1>Pokemon's Showcase</h1>
      
      <PokemonContext.Provider value={[store,pokemonDispatch]}>
        <BrowserRouter>
       
          <Switch>
            <Route exact path="/" component={ShowPokemons}/>
            <Route path="/addPokemon" component={AddPokemon}/>
          </Switch>
        </BrowserRouter>
      </PokemonContext.Provider>
     
    </div>
  );
}

export default App;
