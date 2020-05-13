import React from 'react';
import {Link,Redirect} from 'react-router-dom';
import './add-pokemon.styles.css';
import PokemonContext from './../../utils/context';

const AddPokemon = (props) => {

    const [_store,pokemonDispatch] = React.useContext(PokemonContext);

    const [type,setType] = React.useState(null);
    const [pokemon,setPokemon] = React.useState({
        base:{
            Attack: 0,
            Defense: 0,
            HP: 0,
            Speed: 0
        },
        file: {},
        id: -1,
        name:{
           english: ""
        },
        type:  []
    });

   
    const fileChangedHandler = event => {
        let reader = new FileReader();
        let file = event.target.files[0];
         // generate a new FileReader object
         reader.onloadend = () => {
           pokemon.file = {file:file,reader:reader.result};
            setPokemon(pokemon);
          }
      
          reader.readAsDataURL(file)
    }


    const handleChange = (event) => {
       if(event.target.name === "name"){
            pokemon.name.english = event.target.value;
            
        }
        else if(event.target.name === "Attack" || event.target.name === "HP" || event.target.name === "Speed" 
            || event.target.name === "Defense")
        {
            pokemon.base[event.target.name] = event.target.value;
        }
        setPokemon({...pokemon});
        
    }

    const handleType = (event) => {
     setType(event.target.value)
    }

    const addToList = () => {
      pokemon.type.push(type);
        setPokemon({...pokemon});
       
        setType(null);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        pokemonDispatch({type:'ADD',payload:pokemon});
        alert("Pokemon Successfully Added");
        props.history.push("/");
        
    }

    return (
        <div className="container">
            <Link to="/"><div className="back-link">Home</div></Link>
  <form onSubmit={handleSubmit}>
    <ul className="flex-outer">
    
      <li>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" placeholder="Enter your name here" required onChange={handleChange}/>
      </li>
        <li>
        <input type="file" required onChange={fileChangedHandler}/>
        </li>
      <p>Base</p>
      <li>
        <label htmlFor="attack">Attack</label>
        <input type="number" name="Attack" id="attack" required placeholder="Attack" onChange={handleChange}/>
      </li>
      <li>
        <label htmlFor="defense">Defense</label>
        <input type="number" id="defense" name="Defense" required placeholder="Defense"onChange={handleChange}/>
      </li>
      <li>
        <label htmlFor="HP">HP</label>
        <input type="number" id="HP" name="HP" placeholder="HP" required onChange={handleChange}/>
      </li>
      <li>
        <label htmlFor="Speed">Speed</label>
        <input type="number" id="Speed" name="Speed" placeholder="Speed" required onChange={handleChange}/>
      </li>
      <p>Type</p>
      <li>
        <input type="text"  name="type" placeholder="Enter type here" required onChange={handleType}/>
        <input type='button' value='Add to list' id='add' onClick={addToList} />
      </li>
      <li>
      <ul className="flex-inner">
          {pokemon.type.map((ty) => {
              return <>
                    <li ><p>{ty}</p></li>
              </>
          })}         
        </ul>
      </li>
      <li>
        <button type="submit">Submit</button>
      </li>
    </ul>
  </form>
</div>
    );
};

export default AddPokemon;