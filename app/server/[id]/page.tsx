import React from "react";
import Link from "next/link";
import Image from "next/image";


const PokemonDetail: React.FC<{ pokemon: PokemonDetails }> = ({ pokemon }) => {
  const { name, height, weight, types, id, sprites } = pokemon;

  return (
    <div className="mx-auto max-w-md p-4">
    <Link href={`/server`} passHref>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Retour
        </button>
      </Link>
      <Link
        href={`/server`}
        className="text-2xl text-transform capitalize font-bold mb-4"
      >
        {name}
      </Link>
      <Image
        width={200}
        height={200}
        src={sprites.front_default}
        alt={name}
        className="mb-4"
      />
      <p className="mb-2">Height: {height}</p>
      <p className="mb-2">Weight: {weight}</p>
      <p className="mb-2 text-transform capitalize">
        Types: {types.map(({ type }) => type.name).join(", ")}
      </p>
      <p className="mb-2">Number: {id}</p>
    </div>
  );
};

export default async function PokemonPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon: PokemonDetails = await res.json();

  return pokemon ? <PokemonDetail pokemon={pokemon} /> : <div>Loading...</div>;
}