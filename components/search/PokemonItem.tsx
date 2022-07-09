import React from 'react';
import { IPokemon } from 'pokeapi-typescript';

interface PokemonItemProps {
  pokemon: IPokemon;
}

const PokemonItem: React.FC<PokemonItemProps> = ({ pokemon }) => {
  return <div>{pokemon.name}</div>;
};

export default PokemonItem;
