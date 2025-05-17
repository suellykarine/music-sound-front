import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

import Dashboard from "./pages/Dashboard";
import PlaylistPage from "./pages/Dashboard/Playlist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/playlists" element={<PlaylistPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
