import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios';
import './styles/Pokemon.scss'

const POKEAPI_BASE = 'https://pokeapi.co/api/v2'

function Pokemon() {
  const params = useParams()
  const [pokemon, setPokemon] = useState({})
  const navigate = useNavigate()
  
  useEffect ( () => {
    if (params.name) {
      axios
      .get( `${POKEAPI_BASE}/pokemon/${params.name}`) 
      .then(({data}) => setPokemon(data))     
    }
  }, [params.name]) 
  
  const types = pokemon?.types?.map(type => type.type.name)
  const abilities = pokemon?.abilities?.map(ability => ability.ability.name)
  const stats = pokemon?.stats || []

  const [hp, attack, defense, specialAttack, specialDefense, speed] = pokemon?.stats || []

  const getStatPercentage = (baseStat) => {
    const maxStat = 255 
    return (baseStat / maxStat) * 100
  }

  return (
    <div>
     
    
    <div className="pokemon-card">
      <div className="pokemon-card__container">
        
        <div className="pokemon-card__front">
          <img 
            src={pokemon?.sprites?.other['official-artwork']?.front_default} 
            alt={pokemon.name} 
          />
          <span className="pokemon-id">#{pokemon.id?.toString().padStart(3, '0')}</span>
          <h2>{pokemon?.name}</h2>
          
          <div className="physical-info">
            <div>
              <p>Height<span>{pokemon?.height / 10}m</span></p>
            </div>
            <div>
              <p>Weight<span>{pokemon?.weight / 10}kg</span></p>
            </div>
          </div>

          <div className="types-abilities">
            {types?.map(type => (
              <p key={type} className={type}>{type}</p>
            ))}
          </div>

          <div className="stats-grid">
            {stats.map(stat => (
              <div key={stat.stat.name} className="stat-item">
                <div 
                  className="stat-circle"
                  style={{ '--percentage': getStatPercentage(stat.base_stat) }}
                >
                  <span>{stat.base_stat}</span>
                </div>
                <p>{stat.stat.name}</p>
              </div>
            ))}
          </div>
        </div>

        
        <div className="pokemon-card__back">
          <h3>Abilities</h3>
          <ul>
            {abilities?.map(ability => (
              <li key={ability}>{ability}</li>
            ))}
          </ul>
          
          <h3>Moves</h3>
          <ul>
            {pokemon?.moves?.slice(0, 10).map(move => (
              <li key={move.move.name}>{move.move.name}</li>
            ))}
          </ul>
        </div>
      </div>
      </div>
      
      <button className='btn' onClick={() => navigate(-1)}>Back</button>
      
    </div>
  )
}

export default Pokemon