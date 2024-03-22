"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Pokemon {
  name: string;
  url: string;
  image: string;
}

const PokemonPage = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchPokemon = async (page: number) => {
      const offset = (page - 1) * 50;

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`
        );
        const { results } = await response.json();

        const pokemonList: Pokemon[] = results.map(
          (result: any, index: number) => {
            const paddedIndex = ("00" + (index + 1)).slice(-3);
            const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
            return {
              ...result,
              image,
            };
          }
        );

        setPokemonList(pokemonList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemon(currentPage);
  }, [currentPage]);

  function handlePrevious() {
    setCurrentPage(currentPage - 1);
  }

  function handleNext() {
    setCurrentPage(currentPage + 1);
  }

  return (
    <div className="w-full">
      <h1 className="text-4xl mb-8 text-center">Pokemon</h1>
      <div className="w-full">
        <ul className="flex flex-wrap justify-center">
          {pokemonList.map((pokemon, index) => {
            const pokemonId = pokemon.url.split("/").slice(-2, -1);
            const uniqueKey = `${pokemon.name}-${currentPage}`; 
            return (
              <li key={pokemon.name} className="w-1/5 p-2">
                <div className="flex items-center cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden">
                  <Image
                    key={uniqueKey} 
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="w-16 h-16 mr-4 object-cover"
                    width={400}
                    height={400}
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-bold">{pokemon.name}</h2>
                    <Link href={`/client/${pokemonId}`} passHref>
                      <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-4 flex justify-center space-x-3">
        {currentPage > 1 && (
          <button
            onClick={handlePrevious}
            className="px-4 py-2 bg-blue-300 text-white"
          >
            Previous
          </button>
        )}
        <p className="text-black">{currentPage}</p>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonPage;
