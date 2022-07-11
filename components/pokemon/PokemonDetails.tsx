import * as React from 'react';
import useSWR from 'swr';
import { IPokemon } from 'pokeapi-typescript';
import { GET_POKEMON, getPokemon } from '../../api/pokemon';
import { useRouter } from 'next/router';
import Image from 'next/image';

const PokemonDetails: React.FC = () => {
  const { query } = useRouter();
  const { data: pokemon } = useSWR<IPokemon>(
    GET_POKEMON + query.name,
    getPokemon
  );

  if (!pokemon) {
    return <div>loading...</div>;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="border-white border-4 rounded-2xl w-80 bg-white">
        <div className="h-48 bg-amber-200 rounded-t-2xl flex flex-col items-center justify-center">
          <span className="capitalize font-bold text-xl">{pokemon.name}</span>
          <div className="w-28 mt-4">
            <Image
              src={
                (pokemon.sprites as any).other['official-artwork'].front_default
              }
              alt={`picture of ${pokemon.name}`}
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="p-2 bg-amber-100 mt-1">
          <span className="font-bold mr-2">Type:</span>
          {pokemon.types.map((it) => (
            <span className="mx-1 font-bold text-gray-700" key={it.type.name}>
              {it.type.name}
            </span>
          ))}
        </div>
        <div className="p-2 bg-amber-100 mt-1 rounded-b-2xl bg-white">
          <span className="font-bold mr-2">Ablities:</span>
          {pokemon.abilities.map((it) => (
            <span
              className="mx-1 font-bold text-gray-700"
              key={it.ability.name}
            >
              {it.ability.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
