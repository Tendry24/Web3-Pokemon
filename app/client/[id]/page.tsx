'use client';

import PokemonBasicDetails from '../../components/PokemonBasicDetails'
import axios from 'axios';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PokemonDetails() {
 const pathname = usePathname(); 
 const pokemonId = pathname.split('/').pop();
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
            console.error('Error fetch data:', error);
          });
      };
      fetchPokemonInfo();
    }
 }, [pokemonId]);

 return (
    <div className='min-h-screen bg-gradient-to-r from-red-50 via-blue-50 to-green-50 px-4 pb-4 pt-12'>
      {pokemonInfo ? (
        <>
          <div className='flex w-full items-center justify-center'>
            <div className='absolute left-20 flex items-center gap-5'>
              <Link href={'/client'}>
                <div></div>
              </Link>
            </div>
            <h1 className='rounded-md bg-gray-500 px-5 py-2 text-4xl capitalize text-gray-100'>
              <span className='font-bold text-gray-800'>{pokemonId}</span> {pokemonInfo.name}
            </h1>
          </div>
          <div className='px-12 pb-20 text-gray-800'>
            <PokemonBasicDetails
              id={pokemonInfo.id}
              name={pokemonInfo.name}
              types={pokemonInfo.types}
              weight={pokemonInfo.weight}
              height={pokemonInfo.height}
              sprites={pokemonInfo.sprites}
            />
          </div>
        </>
      ) : (
        <div className='text-center text-xl font-semibold'>Loading...</div>
      )}
    </div>
 );
}