import axios from "axios";
import { useEffect, useState } from "react";
import { FaMusic, FaPlus, FaTimes, FaTrash } from "react-icons/fa";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { musicService } from "../../../services/musicService";
import { debounce } from "../../../utils/debounce";
import {
  CloseButton,
  Container,
  CreateButton,
  EditorColumns,
  EditorContainer,
  EditorHeader,
  Header,
  ModalOverlay,
  PlaylistCard,
  PlaylistCover,
  PlaylistsGrid,
  PlaylistTitle,
  SearchInput,
  SectionTitle,
  TrackAction,
  TrackCover,
  TrackInfo,
  TrackItem,
  TrackList,
} from "./style";
import type { Playlist, Track } from "./types";

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loadingPlaylists, setLoadingPlaylists] = useState(true);
  const [errorPlaylists, setErrorPlaylists] = useState<string | null>(null);

  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [errorCreate, setErrorCreate] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("Usuário não autenticado");

        const response = await axios.get(
          "http://localhost:8000/musica/playlists/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPlaylists(
          response.data.map((pl: any) => ({
            id: pl.id,
            name: pl.nome,
            tracks:
              pl.musicas?.map((m: any) => ({
                id: m.id,
                id_externo: m.id_externo,
                nome: m.nome,
                duracao: m.duracao,
                artist: m.artista,
                coverUrl: m.coverUrl || "https://via.placeholder.com/150",
              })) || [],
          }))
        );
      } catch (error) {
        setErrorPlaylists(
          error instanceof Error ? error.message : "Erro ao carregar playlists"
        );
      } finally {
        setLoadingPlaylists(false);
      }
    };

    fetchPlaylists();
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoadingSearch(true);
    setSearchError(null);

    try {
      const results = await musicService.searchTracks(query);
      setSearchResults(results);
    } catch (error) {
      setSearchError("Erro ao buscar músicas. Tente novamente.");
      console.error(error);
    } finally {
      setLoadingSearch(false);
    }
  };

  const debouncedSearch = debounce(handleSearch, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const addTrackToPlaylist = async (track: Track) => {
    if (!currentPlaylist) return;

    try {
      await musicService.addTrackToPlaylist(currentPlaylist.id, track);

      const updatedPlaylist = {
        ...currentPlaylist,
        tracks: [...(currentPlaylist.tracks || []), track],
      };

      setCurrentPlaylist(updatedPlaylist);
      setPlaylists(
        playlists.map((p) =>
          p.id === updatedPlaylist.id ? updatedPlaylist : p
        )
      );
      toast.success("Música adicionada à playlist!");
    } catch (error) {
      console.error("Erro ao adicionar música:", error);

      if (error instanceof Error && error.message.includes("Sessão expirada")) {
        toast.error("Sessão expirada. Faça login novamente.");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      } else {
        toast.error("Erro ao adicionar música. Tente novamente.");
      }
    }
  };

  const removeTrackFromPlaylist = async (trackId: string) => {
    if (!currentPlaylist?.tracks) return;

    try {
      const trackToRemove = currentPlaylist.tracks.find(
        (t) => t.id === trackId || t.id_externo === trackId
      );
      if (!trackToRemove) {
        toast.error("Música não encontrada na playlist");
        return;
      }

      await musicService.removeTrackFromPlaylist(
        currentPlaylist.id,
        trackToRemove.id_externo
      );

      const updatedPlaylist = {
        ...currentPlaylist,
        tracks: currentPlaylist.tracks.filter(
          (t) => t.id !== trackId && t.id_externo !== trackId
        ),
      };

      setCurrentPlaylist(updatedPlaylist);
      setPlaylists(
        playlists.map((p) =>
          p.id === updatedPlaylist.id ? updatedPlaylist : p
        )
      );
      toast.success("Música removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover música:", error);

      if (error instanceof Error && error.message.includes("Sessão expirada")) {
        toast.error("Sessão expirada. Faça login novamente.");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      } else {
        toast.error("Erro ao remover música. Tente novamente.");
      }
    }
  };

  const createNewPlaylist = async () => {
    if (!newPlaylistName.trim()) {
      setErrorCreate("Digite um nome para a playlist");
      return;
    }

    setLoadingCreate(true);
    setErrorCreate(null);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("Token não encontrado");

      const response = await axios.post(
        "http://localhost:8000/musica/playlists/",
        { nome: newPlaylistName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newPlaylist = {
        id: response.data.id,
        name: response.data.nome,
        tracks: [],
      };

      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName("");
      setShowCreateModal(false);
      toast.success("Playlist criada com sucesso!");
    } catch (error) {
      setErrorCreate(
        error instanceof Error ? error.message : "Erro ao criar playlist"
      );
    } finally {
      setLoadingCreate(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Container>
      <Header>
        <SectionTitle>Suas Playlists</SectionTitle>
        <CreateButton onClick={() => setShowCreateModal(true)}>
          <FaPlus /> Nova Playlist
        </CreateButton>
      </Header>

      {loadingPlaylists ? (
        <div>Carregando playlists...</div>
      ) : errorPlaylists ? (
        <div style={{ color: "red" }}>{errorPlaylists}</div>
      ) : (
        <PlaylistsGrid>
          {playlists.length === 0 ? (
            <p>Nenhuma playlist encontrada. Crie sua primeira playlist!</p>
          ) : (
            playlists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                onClick={() => setCurrentPlaylist(playlist)}
              >
                <PlaylistCover>
                  <FaMusic />
                </PlaylistCover>
                <h3>{playlist.name}</h3>
                <p>{playlist.tracks?.length || 0} música(s)</p>
                <FaTrash id="trash" />
              </PlaylistCard>
            ))
          )}
        </PlaylistsGrid>
      )}

      {showCreateModal && (
        <ModalOverlay onClick={() => setShowCreateModal(false)}>
          <EditorContainer onClick={(e) => e.stopPropagation()}>
            <EditorHeader>
              <PlaylistTitle>Criar Nova Playlist</PlaylistTitle>
              <CloseButton onClick={() => setShowCreateModal(false)}>
                <FaTimes />
              </CloseButton>
            </EditorHeader>

            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="playlistNameInput">
                Digite o nome da playlist
              </label>
              <input
                id="playlistNameInput"
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  marginTop: "0.25rem",
                }}
                disabled={loadingCreate}
                autoFocus
              />
            </div>

            {errorCreate && (
              <p style={{ color: "red", marginBottom: "1rem" }}>
                {errorCreate}
              </p>
            )}

            <CreateButton
              onClick={createNewPlaylist}
              disabled={loadingCreate || !newPlaylistName.trim()}
            >
              {loadingCreate ? "Criando..." : "Criar"}
            </CreateButton>
          </EditorContainer>
        </ModalOverlay>
      )}

      {currentPlaylist && (
        <ModalOverlay onClick={() => setCurrentPlaylist(null)}>
          <EditorContainer onClick={(e) => e.stopPropagation()}>
            <EditorHeader>
              <PlaylistTitle>{currentPlaylist.name}</PlaylistTitle>
              <CloseButton onClick={() => setCurrentPlaylist(null)}>
                <FaTimes />
              </CloseButton>
            </EditorHeader>

            <SearchInput
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Buscar músicas..."
            />

            <EditorColumns>
              <div>
                <h3>Resultados da Busca</h3>
                {loadingSearch ? (
                  <div>Buscando músicas...</div>
                ) : searchError ? (
                  <div style={{ color: "red" }}>{searchError}</div>
                ) : (
                  <TrackList>
                    {searchResults.map((track) => (
                      <TrackItem key={track.id}>
                        <TrackCover src={track.coverUrl} alt={track.nome} />
                        <TrackInfo>
                          <div>
                            <strong>{track.nome}</strong>
                          </div>
                          <div>{track.artist}</div>
                          <div>{formatDuration(track.duracao)}</div>
                        </TrackInfo>
                        <TrackAction onClick={() => addTrackToPlaylist(track)}>
                          <FaPlus />
                        </TrackAction>
                      </TrackItem>
                    ))}
                  </TrackList>
                )}
              </div>

              <div>
                <h3>Playlist ({currentPlaylist.tracks?.length || 0})</h3>
                <TrackList>
                  {currentPlaylist.tracks?.map((track) => (
                    <TrackItem key={track.id}>
                      <TrackCover src={track.coverUrl} alt={track.nome} />
                      <TrackInfo>
                        <div>
                          <strong>{track.nome}</strong>
                        </div>
                        <div>{track.artist}</div>
                        <div>{formatDuration(track.duracao)}</div>
                      </TrackInfo>
                      <TrackAction
                        onClick={() => removeTrackFromPlaylist(track.id)}
                      >
                        <FaTrash />
                      </TrackAction>
                    </TrackItem>
                  ))}
                </TrackList>
              </div>
            </EditorColumns>
          </EditorContainer>
        </ModalOverlay>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Container>
  );
};

export default PlaylistPage;
