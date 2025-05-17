import { Artist, CardContainer, CoverImage, Title } from "./style";

interface MusicCardProps {
  cover: string;
  title: string;
  artist: string;
}

export const MusicCard = ({ cover, title, artist }: MusicCardProps) => (
  <CardContainer>
    <CoverImage src={cover} alt={`Capa de ${title}`} />
    <Title>{title}</Title>
    <Artist>{artist}</Artist>
  </CardContainer>
);
