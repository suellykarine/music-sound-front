import { useState } from "react";
import { FaMusic, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
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

type Track = {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
};

type Playlist = {
  id: string;
  name: string;
  tracks: Track[];
};

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: "1",
      name: "Minha Playlist #1",
      tracks: [
        {
          id: "101",
          title: "Bohemian Rhapsody",
          artist: "Queen",
          coverUrl: "https://via.placeholder.com/150",
        },
        {
          id: "102",
          title: "Imagine",
          artist: "John Lennon",
          coverUrl: "https://via.placeholder.com/150",
        },
      ],
    },
  ]);

  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const mockTracks: Track[] = [
    {
      id: "1",
      title: "Bohemian Rhapsody",
      artist: "Queen",
      coverUrl: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      title: "Imagine",
      artist: "John Lennon",
      coverUrl: "https://via.placeholder.com/150",
    },
    {
      id: "3",
      title: "Billie Jean",
      artist: "Michael Jackson",
      coverUrl: "https://via.placeholder.com/150",
    },
    {
      id: "4",
      title: "Like a Rolling Stone",
      artist: "Bob Dylan",
      coverUrl: "https://via.placeholder.com/150",
    },
    {
      id: "5",
      title: "Smells Like Teen Spirit",
      artist: "Nirvana",
      coverUrl: "https://via.placeholder.com/150",
    },
  ];

  const searchResults = mockTracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const createNewPlaylist = () => {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name: `Nova Playlist #${playlists.length + 1}`,
      tracks: [],
    };
    setPlaylists([...playlists, newPlaylist]);
    setCurrentPlaylist(newPlaylist);
  };

  const addTrackToPlaylist = (track: Track) => {
    if (!currentPlaylist) return;

    const updatedPlaylist = {
      ...currentPlaylist,
      tracks: [...currentPlaylist.tracks, track],
    };

    setCurrentPlaylist(updatedPlaylist);
    setPlaylists(
      playlists.map((p) => (p.id === updatedPlaylist.id ? updatedPlaylist : p))
    );
  };

  const removeTrackFromPlaylist = (trackId: string) => {
    if (!currentPlaylist) return;

    const updatedPlaylist = {
      ...currentPlaylist,
      tracks: currentPlaylist.tracks.filter((t) => t.id !== trackId),
    };

    setCurrentPlaylist(updatedPlaylist);
    setPlaylists(
      playlists.map((p) => (p.id === updatedPlaylist.id ? updatedPlaylist : p))
    );
  };

  return (
    <Container>
      <Header>
        <SectionTitle>Suas Playlists</SectionTitle>
        <CreateButton onClick={createNewPlaylist}>
          <FaPlus /> Nova Playlist
        </CreateButton>
      </Header>

      <PlaylistsGrid>
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            onClick={() => setCurrentPlaylist(playlist)}
          >
            <PlaylistCover>
              <FaMusic />
            </PlaylistCover>
            <h3>{playlist.name}</h3>
            <p>{playlist.tracks.length} música(s)</p>
          </PlaylistCard>
        ))}
      </PlaylistsGrid>

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
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar músicas..."
            />

            <EditorColumns>
              <div>
                <h3>Resultados da Busca</h3>
                <TrackList>
                  {searchResults.map((track) => (
                    <TrackItem key={track.id}>
                      <TrackCover src={track.coverUrl} alt={track.title} />
                      <TrackInfo>
                        <div>
                          <strong>{track.title}</strong>
                        </div>
                        <div>{track.artist}</div>
                      </TrackInfo>
                      <TrackAction onClick={() => addTrackToPlaylist(track)}>
                        <FaPlus />
                      </TrackAction>
                    </TrackItem>
                  ))}
                </TrackList>
              </div>

              <div>
                <h3>Playlist ({currentPlaylist.tracks.length})</h3>
                <TrackList>
                  {currentPlaylist.tracks.map((track) => (
                    <TrackItem key={track.id}>
                      <TrackCover src={track.coverUrl} alt={track.title} />
                      <TrackInfo>
                        <div>
                          <strong>{track.title}</strong>
                        </div>
                        <div>{track.artist}</div>
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
    </Container>
  );
};

export default PlaylistPage;
