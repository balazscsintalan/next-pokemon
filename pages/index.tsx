import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { SWRConfig } from 'swr';
import { INamedApiResource, IPokemon } from 'pokeapi-typescript';
import { ALL_POKEMONS, getAllPokemons } from '../api/pokemon';
import SearchComponent from '../components/search/SearchComponent';

export const getStaticProps: GetStaticProps = async () => {
  const pokemons = await getAllPokemons(ALL_POKEMONS);
  return {
    props: {
      fallback: {
        [ALL_POKEMONS]: pokemons,
      },
    },
    revalidate: 10000,
  };
};

interface PageProps {
  fallback: {
    [ALL_POKEMONS]: INamedApiResource<IPokemon>[];
  };
}

const SearchPage: NextPage<PageProps> = ({ fallback }) => (
  <SWRConfig value={{ fallback }}>
    <SearchComponent />
  </SWRConfig>
);

export default SearchPage;
