import React from 'react';
import { INamedApiResource, IPokemon } from 'pokeapi-typescript';
import Link from 'next/link';

interface PokemonItemProps {
  pokemon: INamedApiResource<IPokemon>;
}

const PokemonSearchItem: React.FC<PokemonItemProps> = ({ pokemon }) => {
  return (
    <div className="p-1 m-1 border-2 border-red-400 bg-gray-100 bg-opacity-50 rounded">
      <Link href={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
    </div>
  );
};

export default PokemonSearchItem;
