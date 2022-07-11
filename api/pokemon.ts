import { Fetcher } from 'swr';
import {
  INamedApiResource,
  INamedApiResourceList,
  IPokemon,
} from 'pokeapi-typescript';
import axios from 'axios';

export const ALL_POKEMONS =
  'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
export const GET_POKEMON = 'https://pokeapi.co/api/v2/pokemon/';

export const getAllPokemons: Fetcher<INamedApiResource<IPokemon>[]> = async (
  url: string
) => {
  const response = await axios.get<INamedApiResourceList<IPokemon>>(url);
  return response.data.results.filter((it) => !it.name.includes('-'));
};

export const getPokemon: Fetcher<IPokemon> = async (url: string) => {
  console.log('Getpokemon url', url);
  const response = await axios.get<IPokemon>(url);
  return response.data;
};
