'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const [hasMore, setHasMore] = useState(true); 

  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&sort_by=popularity.desc',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzJjMjhlODIyOWU3NjM1YmQ4OTViNDM0ZGMxYmJmYSIsIm5iZiI6MTczMjY3MDAzMy4xNDE0Mzc4LCJzdWIiOiI2NzQ2NmY2NmRhNzY3YWFlMzA0MGI2ZTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OLWboX-Pxe8ApFFKMk3V9fgDml3CmtvdJhIKKL_hqUM'
    }
  };

  function getMovies() {
    if (loading || !hasMore) return; 

    setLoading(true);
    axios
      .request({
        ...options,
        url: `${options.url}&page=${page}`,
      })
      .then((response) => {
        const data = response.data.results;
        if (data.length > 0) {
          setMovies((prevMovies) => [...prevMovies, ...data]);
        } else {
          setHasMore(false); 
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar filmes:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getMovies();
  }, [page]); 

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (hasMore && !loading) {
        setPage((prevPage) => prevPage + 1); 
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); 
  }, [loading, hasMore]); 

  return (
    <div className="gridContainer"> 
      {movies && movies.length > 0 ? (
        movies.map((movie) => (
            <Card
              key={movie.id}
              className="card"
              onClick={() => handleCardClick(movie.id)} // Chama a navegação ao clicar
              style={{ cursor: "pointer" }} // Muda o cursor para indicar clicável
            >
              <CardMedia
                component="img"
                height="300"
                className="cardMedia"
                image={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={movie.title}
              />
              <CardContent className="cardContent">
                <Typography className="cardTitle" component="div" color="white">
                  {movie.title}
                </Typography>
                <Typography className="cardSubtitle" component="p">
                  Lançamento: {movie.release_date}
                </Typography>
              </CardContent>
            </Card>
        ))
      ) : (
        <Typography variant="h6" component="p">
          Nenhum filme encontrado
        </Typography>
      )}

      {loading && (
        <div className="loading">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
