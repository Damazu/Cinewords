'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Typography, Card, CardMedia, CardContent } from "@mui/material";

export default function MovieDetails() {
  const { movie } = useParams(); 
  const [movieDetails, setMovieDetails] = useState(null);


useEffect(() => {
    if (movie) {
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${movie}?language=pt-BR`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzJjMjhlODIyOWU3NjM1YmQ4OTViNDM0ZGMxYmJmYSIsIm5iZiI6MTczMjY3MDAzMy4xNDE0Mzc4LCJzdWIiOiI2NzQ2NmY2NmRhNzY3YWFlMzA0MGI2ZTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OLWboX-Pxe8ApFFKMk3V9fgDml3CmtvdJhIKKL_hqUM'
        }
      };
  
      axios
        .request(options)
        .then((response) => {
          setMovieDetails(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar detalhes do filme:", error);
        });
    } else {
      console.warn("Parâmetro 'movie' não encontrado na URL.");
    }
  }, [movie]);
  

  return (
    <div>
      {movieDetails ? (
        <Card>
          <CardMedia
            component="img"
            height="500"
            image={
              movieDetails.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                : "https://via.placeholder.com/300x500?text=No+Image"
            }
            alt={movieDetails.title}
          />
          <CardContent>
            <Typography variant="h4">{movieDetails.title}</Typography>
            <Typography variant="body1">{movieDetails.overview}</Typography>
            <Typography variant="body2">
              Lançamento: {movieDetails.release_date}
            </Typography>
            <Typography variant="body2">
              Avaliação: {movieDetails.vote_average} / 10
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6">Carregando...</Typography>
      )}
    </div>
  );
}
