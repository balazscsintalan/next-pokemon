import { NextPage } from 'next';
import { SWRConfig } from 'swr';
import SearchComponent from '../../components/search/SearchComponent';
import PokemonDetails from '../../components/pokemon/PokemonDetails';

const PokemonDetailsPage: NextPage = () => <PokemonDetails />;

export default PokemonDetailsPage;
