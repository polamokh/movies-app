import {useParams} from "react-router";
import {API_BASE_URL, API_OPTIONS} from "../utils/tmdb.js";
import {useQuery} from "@tanstack/react-query";
import Spinner from "../components/Spinner.jsx";

const MovieDetails = () => {
    const {mid} = useParams();

    const {isPending, data, error} = useQuery({
        queryKey: ["movie", mid],
        queryFn: ({queryKey}) => fetchMovieDetails(queryKey[1])
    });

    const fetchMovieDetails = async (movieId) => {
        const endpoint = `${API_BASE_URL}//movie/${movieId}`;
        const response = await fetch(endpoint, API_OPTIONS);

        return await response.json();
    }

    if (isPending) {
        return (<Spinner/>)
    }

    if (error) {
        return (error.message)
    }

    return (
        <>
            <h1>{data.title}</h1>
            <h2>{data.overview}</h2>
        </>
    )
}

export default MovieDetails;