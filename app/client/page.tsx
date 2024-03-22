"use client";
import { useEffect, useState } from "react";
import Link from 'next/link';

interface Pokemon {
 name: string;
 url: string;
 image: string;
}

const PokemonPage = () => {
 const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
 const [prev, setPrev] = useState<number>(1);

 useEffect(() => {
    const fetchPokemon = async (page : number) => {
    const offset = (page - 1) * 50
    console.log(offset);
    
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}");
        const { results } = await response.json();

        const pokemonList: Pokemon[] = results.map((result: any, index: number) => {
          const paddedIndex = ("00" + (index + 1)).slice(-3);
          const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
          return {
            ...result,
            image,
          };
        });

        setPokemonList(pokemonList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemon(prev);
 }, [prev]);

 function handlePrevious(){
  setPrev(prev-1);
 }

 function handleNext(){
  setPrev(prev+1);
 }
 return (
    <div className="w-full">
      <h1 className="text-4xl mb-8 text-center">Pokemon</h1>
      <div className="w-full">
        <ul className="flex flex-wrap justify-center">
          {pokemonList.map((pokemon, index) => {
            const pokemonId = pokemon.url.split('/').slice(-2,-1);
            console.log(pokemonId);

            return (
              <li key={pokemon.name} className="w-1/5 p-2">
                 <div className="flex items-center cursor-pointer">
                    <img
                      src={pokemon.image}
                      alt={pokemon.name}
                      className="w-16 h-16 mr-4"
                    />
                    <span>{pokemon.name}</span>
    
                    
                <Link href={`/client/${pokemonId}`} passHref>
                    <button >
                        Details
                    </button>
                </Link>
                 </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-4 flex justify-center space-x-3">
          {prev > 1 && (<Link href={`/client?page=${prev}`} passHref>
          <button onClick={handlePrevious} className="px-4 py-2 bg-blue-300 text-white">Previous</button>
          </Link>)}
            <p className="text-black">{prev}</p>
          <Link href={`/client?page=${prev}`} passHref>
          <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white">Next</button>
          </Link>
      </div>
    </div>
 );
};

export default PokemonPage;