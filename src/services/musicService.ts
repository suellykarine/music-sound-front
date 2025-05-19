import axios from "axios";
import type { Track } from "../pages/Dashboard/Playlist/types";

const API_URL = "http://localhost:8000";

export const musicService = {
  async getAuthConfig() {
    await this.ensureTokenIsValid();
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("Token não encontrado");
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  },

  async ensureTokenIsValid() {
    const token = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (!token) {
      throw new Error("Usuário não autenticado");
    }

    const expiration = localStorage.getItem("token_expiration");
    const now = new Date().getTime();

    if (expiration && now >= parseInt(expiration)) {
      if (!refreshToken) {
        throw new Error("Sessão expirada. Faça login novamente.");
      }
      await this.refreshToken();
    }
  },

  async refreshToken() {
    try {
      const refresh = localStorage.getItem("refresh_token");
      if (!refresh) {
        throw new Error("Não há token de refresh disponível");
      }

      const response = await axios.post(`${API_URL}/api/token/refresh/`, {
        refresh,
      });

      const { access, exp } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("token_expiration", (exp * 1000).toString());
      return access;
    } catch (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("token_expiration");
      throw new Error("Sessão expirada. Faça login novamente.");
    }
  },

  async removeTrackFromPlaylist(playlistId: string, trackId: string) {
    try {
      const config = await this.getAuthConfig();

      const response = await axios.delete(
        `${API_URL}/musica/playlists/${playlistId}/musicas/${trackId}/`,
        config
      );

      return response.data;
    } catch (error) {
      console.error("[removeTrackFromPlaylist] Erro capturado:", error);

      if (axios.isAxiosError(error) && error.response?.status === 401) {
        try {
          const newToken = await this.refreshToken();

          const newConfig = {
            headers: { Authorization: `Bearer ${newToken}` },
          };

          const retryResponse = await axios.delete(
            `${API_URL}/musica/playlists/${playlistId}/musicas/${trackId}/`,
            newConfig
          );

          return retryResponse.data;
        } catch (refreshError) {
          console.error(
            "[removeTrackFromPlaylist] Erro no refresh token:",
            refreshError
          );
          throw new Error("Sessão expirada. Faça login novamente.");
        }
      }

      throw error;
    }
  },

  searchTracks: async (query: string) => {
    const response = await axios.get(
      `https://api.jamendo.com/v3.0/tracks/?client_id=256a8b01&search=${encodeURIComponent(
        query
      )}`
    );
    return response.data.results.map((track: any) => ({
      id: track.id,
      id_externo: track.id,
      nome: track.name,
      duracao: track.duration,
      artist: track.artist_name,
      coverUrl: track.album_image || "https://via.placeholder.com/150",
    }));
  },

  async addTrackToPlaylist(playlistId: string, track: Track) {
    try {
      const config = await this.getAuthConfig();
      const response = await axios.post(
        `${API_URL}/musica/playlists/${playlistId}/musicas/`,
        {
          id_externo: track.id_externo,
          nome: track.nome,
          duracao: track.duracao,
          artista: track.artist,
          coverUrl: track.coverUrl,
        },
        config
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        try {
          const newToken = await this.refreshToken();
          const newConfig = {
            headers: { Authorization: `Bearer ${newToken}` },
          };
          const retryResponse = await axios.post(
            `${API_URL}/musica/playlists/${playlistId}/musicas/`,
            {
              id_externo: track.id_externo,
              nome: track.nome,
              duracao: track.duracao,
              artista: track.artist,
              coverUrl: track.coverUrl,
            },
            newConfig
          );
          return retryResponse.data;
        } catch (refreshError) {
          throw new Error("Sessão expirada. Faça login novamente.");
        }
      }
      throw error;
    }
  },
};
