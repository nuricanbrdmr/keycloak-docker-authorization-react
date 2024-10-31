import { Route, Routes } from "react-router-dom";
import Layout from "./components/Duzen";
import Giris from "./components/Giris";
import Kayit from "./components/Kayit";
import BaglantiSayfasi from "./components/BaglantiSayfasi";
import IzinsizSayfasi from "./components/IzinsizSayfasi";
import KaliciGiris from "./components/KaliciGiris";
import RequireAuth from "./components/RequireAuth";
import AnaSayfa from "./components/AnaSayfa";
import Editor from "./components/Editor";
import Admin from "./components/Admin";
import KayipSayfasi from "./components/KayipSayfasi";

/* const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
}; */

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Giris />} />
        <Route path="register" element={<Kayit />} />
        <Route path="linkpage" element={<BaglantiSayfasi />} />
        <Route path="unauthorized" element={<IzinsizSayfasi />} />

        <Route element={<KaliciGiris />}>
          <Route path="/" element={<AnaSayfa />} />
          <Route path="editor" element={<Editor />} />
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route path="*" element={<KayipSayfasi />} />
      </Route>
    </Routes>
  );
}

export default App;
