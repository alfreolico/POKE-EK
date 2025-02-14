import { useEffect, useState } from 'react'
import axios from 'axios';
import { useName } from '../../hooks/useName'
import { data, Link } from 'react-router';
import PokemonList from './components/PokemonList';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2'

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [types, setTypes] = useState([]);
  const [singlePokemon, setSinglePokemon] = useState(null);


  const {name, clearName} = useName();

  //funcion para cargar los primeros 150 pokemones
  const getInitialPokemons = () => {
    axios
    .get(`${POKEAPI_BASE}/pokemon?limit=150`)
    .then(({data}) => {
      setPokemons(data.results)
      setFilteredPokemons(data.results)
      setSinglePokemon(null)
    })
   }

  useEffect(() => {
    getInitialPokemons()
    }, [])

    //funcion para cargar los tipos de pokemones
    useEffect(() => {
      axios
      .get(`${POKEAPI_BASE}/type?limit=18`)
      .then (({data}) => setTypes(data.results))
    }, [])

    // filtrar por nombre en tiempo real mientras se escribe en el input
    useEffect(() => { 
      if (!search) {
        setFilteredPokemons(pokemons)
        setSinglePokemon(null)
        return
      }
      setFilteredPokemons(pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase())))      
    }, [search, pokemons])

//cargar pokemons segun el tipo seleccionado
useEffect(() => {
  if (selectedType === 'all') {
    getInitialPokemons()
    return
  }
  axios
  .get(`${POKEAPI_BASE}/type/${selectedType}`)
  .then(({data}) => {
    const typePokemons = data.pokemon.map(pokemon => pokemon.pokemon)
    setPokemons(typePokemons)
    setFilteredPokemons(typePokemons)
    setSinglePokemon(null)
  })
 }, [selectedType])

 //buscar un pokemon por nombre o id
 const searchPokemon = () => {
  if (!search) {
    getInitialPokemons()
    return
  }
  axios.get(`${POKEAPI_BASE}/pokemon/${search}`)
  .then (({data}) => {
    if (selectedType !== 'all') {
      const isOfType = data.types.some(type => type.type.name === selectedType)
      if (!isOfType) {
        setSinglePokemon(null)
        alert('The pokemon is not of the selected type')
              }
      return
}
setSinglePokemon(data)
})
.catch(() => alert('Pokemon not found'))
setSinglePokemon(null)
}



  return (
    <div>    
      <h1>Pokedex</h1> 
      {name &&
      <div>
        <p>Welcome {name}!, here you can find your favorite pokemon</p>
        <button onClick={clearName}>log out</button>
      </div> 
      }

      <input 
      type="text" 
      placeholder="Filter oe search by name or id" 
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={ (e) => e.key === 'Enter' && searchPokemon()}
      />
      <button onClick={searchPokemon}>search</button>
      <select 
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}      
      >
        <option value='all'>all</option>
        {types.map(type => <option key={type.name} value={type.name}>
          {type.name}
          </option>)}
      </select>      
      
        {singlePokemon ? 
        <Link to={`/pokedex/${singlePokemon.name}`}>
          <h2> {singlePokemon?.name} </h2>
          <img src={singlePokemon?.sprites?.other['official-artwork']?.front_default} alt={singlePokemon.name} />
        </Link>
        :
        <PokemonList pokemons={filteredPokemons}/>        
        }    

    </div>
  )
}

export default Pokedex