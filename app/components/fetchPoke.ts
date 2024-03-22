const ITEMS_PER_PAGE: number = 50;

type Pokemon = {
  name: string;
  url: string;
};

export const fetchPokemonList = async (currentPage: number): Promise<Pokemon[]> => {
  const response: Response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${(currentPage - 1) * ITEMS_PER_PAGE}`
  );
  const data = await response.json();
  return data.results;
};