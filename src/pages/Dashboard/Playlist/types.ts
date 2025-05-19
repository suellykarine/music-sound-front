export type Track = {
  id: string;
  id_externo: string;
  nome: string;
  duracao: number;
  artist: string;
  coverUrl: string;
};

export type Playlist = {
  id: string;
  name: string;
  tracks?: Track[];
};
