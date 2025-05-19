import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: grid;
  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "player player";
  grid-template-columns: 250px 1fr;
  grid-template-rows: 80px 1fr 90px;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  color: white;
`;

export const SidebarContainer = styled.div`
  grid-area: sidebar;
  background: rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
`;

export const Logo = styled.div`
  font-size: 1.8em;
  font-weight: bold;
  margin-bottom: 30px;
  background: linear-gradient(45deg, #00dbde, #fc00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Tooltip = styled.span`
  position: absolute;
  background: #333;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
  white-space: nowrap;

  &:before {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px 5px 0;
    border-style: solid;
    border-color: #333 transparent transparent;
  }
`;

export const MenuItem = styled.a`
  display: block;
  padding: 12px 10px;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-bottom: 5px;
  transition: background 0.3s;
  position: relative;
  cursor: pointer;

  &:hover ${Tooltip} {
    background: rgba(255, 255, 255, 0.1);
    opacity: 1;
  }

  svg {
    margin-right: 10px;
  }
`;

export const HeaderContainer = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const SearchBar = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 10px 15px;
  border-radius: 50px;
  color: white;
  width: 300px;
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(45deg, #00dbde, #fc00ff);
`;

export const MainContent = styled.main`
  grid-area: main;
  padding: 30px;
  overflow-y: auto;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 20px;
  background: linear-gradient(45deg, #00dbde, #fc00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  margin-top: 15px;
`;

export const MusicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
`;

export const PlayerContainer = styled.footer`
  grid-area: player;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const PlayerControls = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const PlayerButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2em;
  cursor: pointer;
`;

export const ProgressBar = styled.div`
  flex-grow: 1;
  height: 5px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  margin: 0 20px;
  position: relative;
`;

export const Progress = styled.div`
  position: absolute;
  height: 100%;
  width: 30%;
  background: linear-gradient(90deg, #00dbde, #fc00ff);
  border-radius: 5px;
`;
