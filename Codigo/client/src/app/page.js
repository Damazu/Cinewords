'use client';

import axios from "axios";
import React, { useState, useEffect } from "react";

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
    axios.request(options)
      .then((response) => {
        const data = response.data.results; // Obtém o array de filmes
        console.log(data);
        setMovies(data); // Define o estado com o array de filmes
      })
      .catch((error) => {
        console.error("Erro ao buscar filmes:", error);
        setMovies([]); // Define como array vazio em caso de erro
      });
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                width: "200px",
              }}
            >
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/default-image.jpg'} // Use uma imagem padrão
                alt={movie.title}
                style={{ width: "100%", borderRadius: "8px" }}
              />

              <h3 style={{ fontSize: "16px", margin: "10px 0" }}>{movie.title}</h3>
              <p style={{ fontSize: "14px" }}>{movie.release_date}</p>
            </div>
          ))
        ) : (
          <p>Nenhum filme encontrado</p>
        )}
      </div>
    </>
  );
}
