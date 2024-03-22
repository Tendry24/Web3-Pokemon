import React from 'react';

interface PokemonBasicDetailsProps {
 id: string;
 name: string;
 types: Array<{ type: { name: string } }>;
 weight: number;
 height: number;
 sprites: { front_default: string}
}


const PokemonBasicDetails: React.FC<PokemonBasicDetailsProps> = ({ id ,name, types, weight, height,sprites }) => {
 return (
    <div>
      <img src={sprites.front_default} alt={name} />
      <h2>ID: {id}</h2>
      <h2>Name: {name}</h2>
      <h3>Types:</h3>
      <ul>
        {types.map((type, index) => (
          <li key={index}>{type.type.name}</li>
        ))}
      </ul>
      <p>Weight: {weight} kg</p>
      <p>Height: {height} cm</p>

    </div>
 );
};

export default PokemonBasicDetails;