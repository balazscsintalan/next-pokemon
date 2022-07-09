import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import useSWR, { SWRConfig } from 'swr';
import { IPokemon } from 'pokeapi-typescript';
import PokemonItem from '../components/search/PokemonItem';

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => res.results);

const API = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

export const getStaticProps: GetStaticProps = async () => {
  const pokemons: IPokemon[] = await fetcher(API);
  return {
    props: {
      fallback: {
        [API]: pokemons,
      },
    },
  };
};

const SearchComponent: NextPage = () => {
  const { data: pokemons } = useSWR<IPokemon[]>(API);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  console.log(pokemons);
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
      <div className="flex flex-wrap mt-6">
        {filteredPokemon?.map((it) => {
          return <PokemonItem pokemon={it} key={it.name} />;
        })}
      </div>
    </div>
  );
};

interface PageProps {
  fallback: {
    [API]: IPokemon[];
  };
}

const SearchPage = ({ fallback }: PageProps) => (
  <SWRConfig value={{ fallback }}>
    <SearchComponent />
  </SWRConfig>
);

export default SearchPage;
