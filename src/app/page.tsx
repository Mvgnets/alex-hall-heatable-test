'use client'
import { Avatar, Box, Button, Card, Container, Flex, Heading, IconButton, ScrollArea, Text, TextField } from "@radix-ui/themes";
import { Key, useEffect, useState } from "react";
import { IPokemon, IPokemonDetails } from "./interfaces/interfaces";
import { useFetchPokemonDetails } from "./hooks/fetchPokemonDetails";
import { useFetchAllPokemon } from "./hooks/fetchAllPokemon";

export default function Home() {
  const { data, loading, error } = useFetchAllPokemon();

  const [allPokemon, setAllPokemon] = useState<IPokemon[]>();

  const [selectedPokemon, setSelectedPokemon] = useState<IPokemon>()
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<IPokemonDetails>()
  const { detailsData } = useFetchPokemonDetails(selectedPokemon);

  useEffect(() => {
    if (data?.results) {
      setSelectedPokemon(data?.results[selectedIndex])
      setAllPokemon(data?.results)
    }
    if (detailsData) {
      setSelectedPokemonDetails(detailsData)
    }
  }, [data, selectedIndex, detailsData]);

  function pokemonFilter(name: string) {
    setAllPokemon(data?.results?.filter((pokemon: IPokemon) => pokemon.name.includes(name)))
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <Box style={{ display: 'flex', justifyContent: 'center' }}>
      <Container size="1">
        <Box style={{ backgroundColor: '#de1236', width: '35rem', height: '22rem', padding: '0.5rem', borderRadius: 5 }}>
          <Heading>Pokedex</Heading>
          <Box className="grid grid-cols-2 pl-2 pt-2">
            <Box style={{ display: 'grid', justifyContent: 'center' }}>
              <Card style={{ width: '15rem', height: '10rem', background: 'white', marginTop: '2rem' }}>
                <Box style={{ display: 'grid', justifyContent: 'center' }}>
                  {selectedPokemon && <Text style={{ color: 'black', textTransform: 'capitalize', fontWeight: 700, fontSize: '1.2rem' }}>
                    {selectedPokemon.name}
                  </Text>}
                </Box>
                <Box className="grid grid-cols-2 pl-2 pt-2">
                  <Box>
                    <Heading style={{ color: 'black', textTransform: 'capitalize', fontWeight: 600 }}>Abilities</Heading>
                    <Box style={{ display: 'flex', flexDirection: 'column' }} width='1'>
                      {selectedPokemonDetails?.abilities?.map((ability, i: Key) => {
                        return <Text key={i} style={{ color: 'black', textTransform: 'capitalize' }}>
                          {ability.ability.name}
                        </Text>
                      })}
                    </Box>
                  </Box>
                  <Avatar
                    src={selectedPokemonDetails?.sprites?.front_default}
                    fallback="A"
                  />
                </Box>
              </Card>
              <Flex gap="3" width={'100%'} style={{ display: "flex", justifyContent: 'space-between', marginTop: '2.5rem' }}>
                <IconButton style={{ backgroundColor: '#232323', padding: '0.5rem', borderRadius: 5 }} onClick={() => selectedIndex > 0 ? setSelectedIndex(selectedIndex - 1) : undefined}>
                  <svg width="3rem" height="3rem" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7.5C1 7.66148 1.07798 7.81301 1.20938 7.90687L8.20938 12.9069C8.36179 13.0157 8.56226 13.0303 8.72879 12.9446C8.89533 12.8589 9 12.6873 9 12.5L9 10L11.5 10C11.7761 10 12 9.77614 12 9.5L12 5.5C12 5.22386 11.7761 5 11.5 5L9 5L9 2.5C9 2.31271 8.89533 2.14112 8.72879 2.05542C8.56226 1.96972 8.36179 1.98427 8.20938 2.09313L1.20938 7.09314C1.07798 7.18699 1 7.33853 1 7.5ZM8 3.4716L8 5.5C8 5.77614 8.22386 6 8.5 6L11 6L11 9L8.5 9C8.22386 9 8 9.22386 8 9.5L8 11.5284L2.36023 7.5L8 3.4716Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                    </path>
                  </svg>
                </IconButton>
                <IconButton style={{ backgroundColor: '#232323', padding: '0.5rem', borderRadius: 5 }} onClick={() => setSelectedIndex(selectedIndex + 1)}>
                  <svg width="3rem" height="3rem" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 7.5C14 7.66148 13.922 7.81301 13.7906 7.90687L6.79062 12.9069C6.63821 13.0157 6.43774 13.0303 6.27121 12.9446C6.10467 12.8589 6 12.6873 6 12.5L6 10L3.5 10C3.22386 10 3 9.77614 3 9.5L3 5.5C3 5.22386 3.22386 5 3.5 5L6 5L6 2.5C6 2.31271 6.10467 2.14112 6.27121 2.05542C6.43774 1.96972 6.63821 1.98427 6.79062 2.09313L13.7906 7.09314C13.922 7.18699 14 7.33853 14 7.5ZM7 3.4716L7 5.5C7 5.77614 6.77614 6 6.5 6L4 6L4 9L6.5 9C6.77614 9 7 9.22386 7 9.5L7 11.5284L12.6398 7.5L7 3.4716Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                    </path>
                  </svg>
                </IconButton>
              </Flex>
            </Box>
            <Box style={{ border: '1px solid white', borderRadius: '0px 0px 7px 7px', display: 'flex', flexDirection: 'column' }}>
              <TextField.Root >
                <TextField.Input style={{ color: 'black', width: '100%' }} placeholder="Search..." onChange={(e) => pokemonFilter(e.target.value)} />
              </TextField.Root>
              <ScrollArea type="always" scrollbars="vertical" style={{ height: '16rem' }}>
                <Box style={{ display: 'flex', flexDirection: 'column', maxHeight: '17rem' }}>
                  {allPokemon?.map((pokemon: IPokemon, i: number) => {
                    return <Button style={{ textTransform: 'capitalize', marginTop: 2 }} key={i} onClick={() => {
                      console.log(pokemon)
                      setSelectedPokemon(pokemon);
                      setSelectedIndex(data?.results.indexOf(pokemon))
                    }}>{pokemon.name}</Button>
                  })}
                </Box>
              </ScrollArea>
            </Box>
          </Box>



        </Box>

      </Container>
    </Box >
  );
}
