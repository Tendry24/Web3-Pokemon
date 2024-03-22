"use client";

import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PokemonDetails() {
  const pathname = usePathname();
  const pokemonId = pathname.split("/").pop();
  const [pokemonInfo, setPokemonInfo] = useState<PokemonDetail | null>(null);

  useEffect(() => {
    if (pokemonId) {
      const fetchPokemonInfo = () => {
        axios
          .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
          .then((pokemonResponse) => {
            setPokemonInfo(pokemonResponse.data);
          })
          .catch((error) => {
            console.error("Error fetch data:", error);
          });
      };
      fetchPokemonInfo();
    }
  }, [pokemonId]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-50 via-blue-50 to-green-50 px-4 pb-4 pt-12">
      <Link href={`/client`} passHref>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Retour
        </button>
      </Link>
      {pokemonInfo ? (
        <>
          <div className="flex w-full items-center justify-center">
            <div className="absolute left-20 flex items-center gap-5">
              <Link href={"/client"}>
                <div></div>
              </Link>
            </div>
            <h1 className="rounded-md bg-gray-500 px-5 py-2 text-4xl capitalize text-gray-100">
              <span className="font-bold text-gray-800">{pokemonId}</span>{" "}
              {pokemonInfo.name}
            </h1>
          </div>
          <div className="px-12 pb-20 text-gray-800">
            <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-8">
              <Image
                width={500}
                height={500}
                src={pokemonInfo.sprites.front_default}
                alt={pokemonInfo.name}
                className="w-32 h-32 mx-auto rounded-full"
              />
              <h2 className="text-2xl mt-6 mb-2 text-center">
                {pokemonInfo.name}
              </h2>
              <div className="flex flex-col items-center">
                <span className="font-bold mr-2">Weight:</span>{" "}
                {pokemonInfo.weight}
                <span className="font-bold mr-2">Height:</span>{" "}
                {pokemonInfo.height}
              </div>
              <h2 className="text-2xl mt-6 mb-2">Types</h2>
              <div className="flex flex-wrap justify-center">
                {pokemonInfo.types.map((type, index) => (
                  <span
                    key={index}
                    className="bg-blue-500 text-white rounded-full px-2 py-1 m-1"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-xl font-semibold">Loading...</div>
      )}
    </div>
  );
}
