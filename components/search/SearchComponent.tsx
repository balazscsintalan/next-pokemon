import useSWR from 'swr';
import { INamedApiResource, IPokemon } from 'pokeapi-typescript';
import React from 'react';
import PokemonSearchItem from './PokemonSearchItem';
import { getAllPokemons, pokemonFetcher } from '../../api/pokemon';

const SearchComponent = () => {
  const { data: pokemons } = useSWR<INamedApiResource<IPokemon>[]>(
    getAllPokemons,
    pokemonFetcher
  );
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  const filteredPokemon = React.useMemo(() => {
    if (!searchTerm) {
      return [];
    }
    return pokemons?.filter((it) => it.name.includes(searchTerm));
  }, [pokemons, searchTerm]);

  const onSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <div className="mt-60 max-w-screen-sm flex flex-col items-center">
        <h1 className="font-bold text-3xl">Search for your Pokemon</h1>
        <input
          type="text"
          id="name"
          name="name"
          onChange={onSearchTermChange}
          value={searchTerm}
          className="mt-3 w-full bg-gray-100 bg-opacity-50 rounded border
                    border-gray-300 focus:border-rose-300 focus:bg-white
                    focus:ring-2 focus:ring-rose-200 text-base outline-none
                    text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="flex flex-wrap mt-6 max-w-xl justify-center">
        {filteredPokemon?.map((it) => {
          return <PokemonSearchItem pokemon={it} key={it.name} />;
        })}
      </div>
    </div>
  );
};

export default SearchComponent;
