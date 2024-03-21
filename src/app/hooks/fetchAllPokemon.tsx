import useAxios from "axios-hooks";

export function useFetchAllPokemon() {
    const [{ data, loading, error }, executeData] = useAxios(
        'https://pokeapi.co/api/v2/pokemon?limit=151'
    )
    return { data, loading, error }
}