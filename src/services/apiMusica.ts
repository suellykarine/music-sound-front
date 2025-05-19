import axios from "axios";

const API_URL = "http://localhost:8000";
const JAMENDO_API = "https://api.jamendo.com/v3.0/tracks/?client_id=256a8b01";

export const musicService = {
  searchTracks: async (query: string) => {
    try {
      const response = await axios.get(
        `${JAMENDO_API}&search=${encodeURIComponent(query)}`
      );
      return response.data.results.map((track: any) => ({
        id: track.id,
        id_externo: track.id,
        nome: track.name,
        duracao: track.duration,
        artist: track.artist_name,
        coverUrl: track.album_image || "https://via.placeholder.com/150",
      }));
    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
      throw error;
    }
  },

  addTrackToPlaylist: async (
    playlistId: string,
    trackData: {
      id_externo: string;
      nome: string;
      duracao: number;
    }
  ) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        `${API_URL}/musica/playlists/${playlistId}/musicas/`,
        trackData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar música:", error);
      throw error;
    }
  },
};
