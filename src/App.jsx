import Home from "./pages/Home.jsx";
import {BrowserRouter, Route, Routes} from "react-router";
import MovieDetails from "./pages/MovieDetails.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
});

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/movies?" element={<Home/>}/>
                    <Route path="/movie/:mid" element={<MovieDetails/>}/>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
