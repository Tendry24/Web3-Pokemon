import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Pokemon {
    name: string;
    url: string;
}
  
  interface PokemonListProps {
    pokemons: Pokemon[];
    page: number;
    fetchPokemons: (page: number) => void;
}

  const PokemonList: React.FC<PokemonListProps> = ({
    pokemons,
    page,
    fetchPokemons,
  }) => {
    return (
      <div className="w-full">
        <h1 className="text-4xl mb-8 text-center"> Pokemon</h1> 
        <ul className="flex flex-wrap justify-center">
          {pokemons.map(({ name, url }, index) => (
            <li
              key={index}
              className="w-1/5 p-2"
            >
              <div className="flex items-center cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden">
                <span className="text-lg text-rose-600 text-transform capitalize font-semibold mb-2">
                  {name}
                </span>
                <Image
                  width={400}
                  height={4}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${url.split("/").slice(-2, -1)}.png`}
                  alt={name}
                  className="w-16 h-16 mr-4 object-cover"
                />
                <Link href={`/server/${url.split("/").slice(-2, -1)}`} passHref>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2">
                    Details
                  </button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-center">
          Page {page}
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          {page > 1 && (
            <Link href={`/server?page=${page - 1}`} passHref>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Previous
              </button>
            </Link>
          )}
          {page > 0 && (
            <Link href={`/server?page=${page + 1}`} passHref>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Next
              </button>
            </Link>
          )}
        </div>
      </div>
    );
  };
  
  const fetchPokemons = async (page: number) => {
    const offset = (page - 1) * 50;
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`,
    );
    const data = await res.json();
  
    const pokemons: Pokemon[] = data.results;
    const totalPages = Math.ceil(data.count / 50);
  
    return { pokemons, page };
  };
  
  export default async function PokemonPage(props: any) {
    const page = props.searchParams.page ? parseInt(props.searchParams.page) : 1;
    const offset = (page - 1) * 50;
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`,
    );
    const data = await res.json();
  
    const pokemons: Pokemon[] = data.results;
    const totalPages = Math.ceil(data.count / 50);
  
    return (
      <PokemonList
        pokemons={pokemons}
        page={page}
        fetchPokemons={fetchPokemons}
      />
    );
  }