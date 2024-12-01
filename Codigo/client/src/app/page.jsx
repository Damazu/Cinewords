'use client';

import axios from "axios";
import { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

export default function Home() {
  const [movies, setMovies] = useState([]);

  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzJjMjhlODIyOWU3NjM1YmQ4OTViNDM0ZGMxYmJmYSIsIm5iZiI6MTczMjY3MDAzMy4xNDE0Mzc4LCJzdWIiOiI2NzQ2NmY2NmRhNzY3YWFlMzA0MGI2ZTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OLWboX-Pxe8ApFFKMk3V9fgDml3CmtvdJhIKKL_hqUM'
    }
  };

  function getMovies() {
    axios
      .request(options)
      .then((response) => {
        const data = response.data.results;
        console.log(data);
        setMovies(data); 
      })
      .catch((error) => {
        console.error("Erro ao buscar filmes:", error);
        setMovies([]); 
      });
  }

  useEffect(() => {
    getMovies();
  }, []);

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
    </div>
  );
}
