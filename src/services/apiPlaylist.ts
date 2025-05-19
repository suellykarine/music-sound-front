import axios from "axios";

export const apiPlaylist = axios.create({
  baseURL: "http://localhost:8000/musica/playlists",
});

apiPlaylist.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
