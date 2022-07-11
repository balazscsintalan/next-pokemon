import { Fetcher } from 'swr';
import {
  INamedApiResource,
  INamedApiResourceList,
  IPokemon,
} from 'pokeapi-typescript';
import axios from 'axios';

export const getAllPokemons =
  'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

export const pokemonFetcher: Fetcher<INamedApiResource<IPokemon>[]> = async (
  url: string
) => {
  const response = await axios.get<INamedApiResourceList<IPokemon>>(url);
  return response.data.results.filter((it) => !it.name.includes('-'));
};
