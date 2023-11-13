import React, { useState } from 'react';
import axios from 'axios';

const PokemonList = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setPokemonName(event.target.value.toLowerCase());
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      setPokemonData(response.data);
      setError(null);
      console.log(pokemonData);
    } catch (err) {
      setPokemonData(null);
      setError('Pokemon not found');
    }
  };

  return (
    <div>
      <label>
        Search Pokemon:{" "}
        <div>
        <input type="text" value={pokemonName} onChange={handleInputChange} />
        <button onClick={handleSearch}>Search</button>
        </div>
      </label>
   

      {pokemonData && (
        <div>
          <h2>{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <p>Height: {pokemonData.height}</p>
          <p>Weight: {pokemonData.weight}</p>
          <p>Types: {pokemonData.types.map(type => type.type.name).join(', ')}</p>
          <p>Base Stats: </p>
          <ul>
            {pokemonData.stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default PokemonList;
