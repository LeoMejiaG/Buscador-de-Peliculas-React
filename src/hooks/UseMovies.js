import { useState, useRef, useMemo } from "react";
import { searchMovies } from "../services/SearchMovies";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const previousSearch = useRef(search);

  const getMovies = async () => {
    if (search === previousSearch.current) return;

    try {
      setError(null);
      setLoading(true);
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (e) {
      setError(e.menssage);
    } finally {
      setLoading(false);
    }
  };
  const OrdenItems = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;

  },[sort, movies]) 

  return { movies: OrdenItems, getMovies, loading };
}
