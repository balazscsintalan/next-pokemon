import { GetServerSideProps, NextPage } from 'next';
import { SWRConfig } from 'swr';
import { IPokemon } from 'pokeapi-typescript';
import PokemonDetails from '../../components/pokemon/PokemonDetails';
import { GET_POKEMON, getPokemon } from '../../api/pokemon';

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  params,
}) => {
  const route = GET_POKEMON + params?.name;
  const pokemon = await getPokemon(route);
  console.log(route);
  return {
    props: {
      fallback: {
        [route]: pokemon,
      },
    } as PageProps,
  };
};

interface PageProps {
  fallback: {
    [k: string]: IPokemon;
  };
}

const PokemonDetailsPage: NextPage<PageProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <PokemonDetails />
    </SWRConfig>
  );
};

export default PokemonDetailsPage;
