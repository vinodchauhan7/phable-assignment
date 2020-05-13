import React from 'react';
import PokemonContext from './../../utils/context';
import './show-pokemons.styles.css';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';

const ShowPokemons = () => {
    const [currentModal,setModal] =  React.useState({current:{},isOpen:false});
    const [store,pokemonDispatch] = React.useContext(PokemonContext);
    let storedImages = JSON.parse(localStorage.getItem("images"));

    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };

    return(<React.Fragment>
       <div className="add-div">
          <Link to="/addPokemon">
            <span>Add Pokemon</span>
          </Link>
        </div>
         <ul className="pokemon-list">
        {store.pokemonsList.map((pokemon) => {
            
          return (<li className="pokemon-list-item" key={pokemon.id}>
            {pokemon.id <= 151 ? 
                <img onClick={() => setModal({current:pokemon,isOpen:true})} src={require(`../.././images/${(pokemon.id+'').padStart(3,'0')}.png`)} alt={pokemon.name.english} loading="lazy"></img>
                :
                 <img onClick={() => setModal({current:pokemon,isOpen:true})} src={storedImages[pokemon.id]} alt={pokemon.name.english} loading="lazy"></img>
            }
            <span>{pokemon.name.english}</span>
            <button onClick={() => pokemonDispatch({type:"DELETE",payload:pokemon})}>X</button>
              </li>)
        })}
      </ul>
      <Modal
          isOpen={currentModal.isOpen}
          style={customStyles}
          contentLabel="Show Pokemon Details"
        >
          <button onClick={() => setModal({current:{},isOpen:false})}>close</button>
          <h1>{Object.keys(currentModal.current).length > 0 ? currentModal.current.name.english : ""}</h1>
          <h4>HP : {currentModal.current.base?.HP}</h4>
          <h4>Attack : {currentModal.current.base?.Attack}</h4>
          <h4>Defense : {currentModal.current.base?.Defense}</h4>
          <h4>Type : {currentModal.current.type?.toString()}</h4>
        </Modal>
    </React.Fragment>)
};

export default ShowPokemons;