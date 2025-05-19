import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  color: white;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  &:after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    z-index: -1;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const CreateButton = styled.button`
  background: linear-gradient(45deg, #00dbde, #fc00ff);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PlaylistsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;

  #info-playlist {
    color: #00dbde;
    font-size: 18px;
  }
`;

export const PlaylistCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.03);
    background: rgba(255, 255, 255, 0.1);
  }
  #trash {
    margin-left: 90%;
  }
`;

export const PlaylistCover = styled.div`
  background: rgba(0, 0, 0, 0.3);
  height: 120px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const EditorContainer = styled.div`
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  width: 80%;
  max-width: 800px;
  max-height: 80vh;
  border-radius: 10px;
  padding: 20px;
  overflow-y: auto;
`;

export const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const PlaylistTitle = styled.h2`
  font-size: 1.5rem;
  background: linear-gradient(45deg, #00dbde, #fc00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
`;

export const SectionTitle = styled.h2`
  font-size: 2em;
  margin-bottom: 20px;
  background: linear-gradient(45deg, #00dbde, #fc00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  margin-top: 15px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border-radius: 50px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  margin-bottom: 20px;
`;

export const EditorColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const TrackList = styled.div`
  margin-top: 10px;
`;

export const TrackItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  background: rgba(255, 255, 255, 0.05);
`;

export const TrackCover = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  margin-right: 15px;
`;

export const TrackInfo = styled.div`
  flex: 1;
`;

export const TrackAction = styled.div`
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
