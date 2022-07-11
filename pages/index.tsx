import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { SWRConfig } from 'swr';
import { IPokemon } from 'pokeapi-typescript';
import { getAllPokemons } from '../api/pokemon';
import SearchComponent from '../components/search/SearchComponent';
import fetcher from '../api/fetcher';

export const getStaticProps: GetStaticProps = async () => {
  const pokemons: IPokemon[] = await fetcher(getAllPokemons);
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
    [getAllPokemons]: IPokemon[];
  };
}

const SearchPage: NextPage<PageProps> = ({ fallback }) => (
  <SWRConfig value={{ fallback }}>
    <SearchComponent />
  </SWRConfig>
);

export default SearchPage;
