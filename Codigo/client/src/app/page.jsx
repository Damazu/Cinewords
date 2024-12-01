'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // Controle de página
  const [loading, setLoading] = useState(false); // Controle de loading
  const [hasMore, setHasMore] = useState(true); // Controle de quando parar de carregar filmes

  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&sort_by=popularity.desc',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzJjMjhlODIyOWU3NjM1YmQ4OTViNDM0ZGMxYmJmYSIsIm5iZiI6MTczMjY3MDAzMy4xNDE0Mzc4LCJzdWIiOiI2NzQ2NmY2NmRhNzY3YWFlMzA0MGI2ZTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OLWboX-Pxe8ApFFKMk3V9fgDml3CmtvdJhIKKL_hqUM'
    }
  };

  // Função para obter filmes da API
  function getMovies() {
    if (loading || !hasMore) return; // Impede chamadas enquanto o loading está ativo ou não há mais filmes

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
          setHasMore(false); // Não há mais filmes para carregar
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar filmes:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // UseEffect para carregar os filmes ao inicializar
  useEffect(() => {
    getMovies();
  }, [page]); // Carrega filmes sempre que a página mudar

  // Função para detectar o scroll
  const handleScroll = () => {
    // Verifica se o usuário chegou ao final da página
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      // Se a página estiver no final e não estiver carregando
      if (hasMore && !loading) {
        setPage((prevPage) => prevPage + 1); // Incrementa a página
      }
    }
  };

  // Adiciona o evento de scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Limpa o evento ao desmontar o componente
  }, [loading, hasMore]); // Reexecuta quando o estado de loading ou hasMore mudar

  return (
    <div className="gridContainer">
      {movies && movies.length > 0 ? (
        movies.map((movie) => (
          <Card key={movie.id} className="card">
            <CardMedia
              component="img"
              height="300"
              className="cardMedia"
              image={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : 'https://via.placeholder.com/200x300?text=No+Image'
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
