import {
  FaCog,
  FaFolder,
  FaHeart,
  FaHome,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { MusicCard } from "./Card/musicCard";
import {
  DashboardContainer,
  HeaderContainer,
  Logo,
  MainContent,
  MenuItem,
  MusicGrid,
  PlayerButton,
  PlayerContainer,
  PlayerControls,
  Progress,
  ProgressBar,
  SearchBar,
  SectionTitle,
  SidebarContainer,
  Tooltip,
  UserAvatar,
  UserProfile,
} from "./style";

const Dashboard = () => {
  return (
    <DashboardContainer>
      <SidebarContainer>
        <Logo>SoundWave</Logo>
        <nav>
          <MenuItem href="#">
            <FaHome /> Início
          </MenuItem>
          <MenuItem as={Link} to="/playlists">
            <FaFolder /> Playlists
          </MenuItem>
          <MenuItem href="#">
            <FaSearch /> Explorar
            <Tooltip>Em breve</Tooltip>
          </MenuItem>
          <MenuItem href="#">
            <FaHeart /> Favoritos
            <Tooltip>Em breve</Tooltip>
          </MenuItem>
          <MenuItem href="#">
            <FaCog /> Configurações
            <Tooltip>Em breve</Tooltip>
          </MenuItem>
          <MenuItem as={Link} to="/">
            <FaSignOutAlt /> Sair
          </MenuItem>
        </nav>
      </SidebarContainer>

      <HeaderContainer>
        <SearchBar type="text" placeholder="Buscar músicas, artistas..." />
        <UserProfile>
          <UserAvatar />
          <span>Usuário</span>
        </UserProfile>
      </HeaderContainer>

      <MainContent>
        <SectionTitle>Destaques</SectionTitle>
        <MusicGrid>
          <MusicCard
            cover="https://picsum.photos/seed/topbrasil/300/300"
            title="Top Brasil"
            artist="Vários Artistas"
          />
          <MusicCard
            cover="https://picsum.photos/seed/topmundial/300/300"
            title="Top Mundial"
            artist="Vários Artistas"
          />
        </MusicGrid>

        <SectionTitle>Playlists Recomendadas</SectionTitle>
        <MusicGrid>
          <MusicCard
            cover="https://picsum.photos/150/150"
            title="Chill Vibes"
            artist="50 músicas"
          />
          <MusicCard
            cover="https://picsum.photos/seed/pop/200/200"
            title="Sunset Beats"
            artist="50 músicas"
          />
          <MusicCard
            cover="https://picsum.photos/seed/jazz/200/200"
            title="Golden Classics"
            artist="50 músicas"
          />
          <MusicCard
            cover="https://picsum.photos/seed/rock/200/200"
            title="Rhythms"
            artist="50 músicas"
          />
        </MusicGrid>
      </MainContent>

      <PlayerContainer>
        <div style={{ width: "100px" }}>Música Atual</div>
        <PlayerControls>
          <PlayerButton>⏮</PlayerButton>
          <PlayerButton title="Em breve">▶️</PlayerButton>
          <PlayerButton>⏭</PlayerButton>
        </PlayerControls>
        <ProgressBar>
          <Progress />
        </ProgressBar>
        <PlayerButton>🔊</PlayerButton>
      </PlayerContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
