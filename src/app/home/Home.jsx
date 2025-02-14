import React, { useRef } from 'react'
import { useNavigate } from 'react-router';
import { useName } from '../../hooks/useName'
import './styles/Home.scss'


function Home() {
  const inputRef = useRef();
  const {setName} = useName();
  const navigate = useNavigate();

  const handleSetName = () => {
    if (!inputRef.current.value) return
    setName(inputRef.current.value)
    navigate('/pokedex')
  }
  return (
    <div className='home-container'>
      <img 
        src="/Samuel_Oak.png" 
        alt="Professor Oak" 
        className="professor-oak"
      />
      <div className="speech-bubble">
       <h1>Welcome to the Pokémon World!</h1>
      <h2>Hello, young trainer!</h2>
      <p>
      I'm Professor Oak.<br/> Before you start to use your POKEDEX<br/>
      I need to know your name.
      </p>
      <input 
        type="text" 
        ref={inputRef}
        placeholder="Write your name here..."
        onKeyDown={(e) => e.key === 'Enter' && handleSetName()}
      />
      <button onClick={handleSetName}>
        ¡Let's Start the Adventure!
      </button>

      </div>
    </div>
  );
}

export default Home;

