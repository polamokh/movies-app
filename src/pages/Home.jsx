import {useState} from "react";
import {useDebounce} from "react-use";
import {getTrendingMovies, updateSearchCount} from "../utils/appwrite.js";
import Search from "../components/Search.jsx";
import Spinner from "../components/Spinner.jsx";
import MovieCard from "../components/MovieCard.jsx";
import {useQuery} from "@tanstack/react-query";
import {API_BASE_URL, API_OPTIONS} from "../utils/tmdb.js";

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

    const {isPending: trendingIsPending, data: trendingMovies} = useQuery({
        queryKey: ["trending"], queryFn: () => loadTrendingMovies()
    })

    const {isPending: moviesIsPending, data: movies, error: moviesError} = useQuery({
        queryKey: ["movies", debouncedSearchTerm],
        queryFn: ({queryKey}) => fetchMovies(queryKey[1]),
    })

    const fetchMovies = async (query = "") => {
        const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
        const response = await fetch(endpoint, API_OPTIONS);

        const data = await response.json();

        if (query && data.results.length > 0) {
            await updateSearchCount(query, data.results[0]);
        }

        return data.results;
    }

    const loadTrendingMovies = async () => {
        return await getTrendingMovies();
    }

    return (<main>
        <div className="pattern"/>
        <div className="wrapper">
            <header>
                <img src="/hero.png" alt="Hero Banner"/>
                <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>

                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            </header>

            {trendingIsPending ? <Spinner/> : trendingMovies.length > 0 && (<section className="trending">
                <h2>Trending Movies</h2>

                <ul>
                    {trendingMovies.map((movie, index) => (<li key={movie.$id}>
                        <p> {index + 1}</p>
                        <img src={movie.poster_url} alt={movie.title}/>
                    </li>))}
                </ul>
            </section>)}

            <section className="all-movies">
                <h2>All Movies</h2>

                {moviesIsPending ? <Spinner/> : moviesError ? <p className="text-red-500">{moviesError.message} : </p> :
                    <ul>
                        {movies.map((movie) => (<MovieCard key={movie.id} movie={movie}/>))}
                    </ul>}
            </section>
        </div>
    </main>)
}

export default Home;
