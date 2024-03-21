import useAxios from "axios-hooks";
import { IPokemon } from "../interfaces/interfaces";

export function useFetchPokemonDetails(selectedPokemon: IPokemon | undefined) {
    const [{ data: detailsData, loading: detailsLoading, error: dertailsError }, executeDetails] = useAxios(
        selectedPokemon?.url ?? ''
    )
    return { detailsData, detailsLoading, dertailsError };
}