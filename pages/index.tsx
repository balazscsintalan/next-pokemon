import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { SWRConfig } from 'swr';
import { INamedApiResource, IPokemon } from 'pokeapi-typescript';
import { getAllPokemons, pokemonFetcher } from '../api/pokemon';
import SearchComponent from '../components/search/SearchComponent';

export const getStaticProps: GetStaticProps = async () => {
  const pokemons = await pokemonFetcher(getAllPokemons);
  return {
    props: {
      fallback: {
        [getAllPokemons]: pokemons,
      },
    },
    revalidate: 10000,
  };
};

interface PageProps {
  fallback: {
    [getAllPokemons]: INamedApiResource<IPokemon>[];
  };
}

const SearchPage: NextPage<PageProps> = ({ fallback }) => (
  <SWRConfig value={{ fallback }}>
    <SearchComponent />
  </SWRConfig>
);

export default SearchPage;
