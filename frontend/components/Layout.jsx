import { Link, Outlet } from "react-router-dom";
import "../src/styles/layout.css"; // 🔥 Importamos el CSS

export default function Layout() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <h1>📒 Mi App de Notas</h1>
        <div className="nav-links">
          <Link to="/">🏠 Inicio</Link>
          <Link to="/notes">📝 Notas</Link>
          <Link to="/settings">⚙️ Configuración</Link>
        </div>
      </nav>

      {/* Contenido Principal */}
      <main className="main-container">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} Mi App de Notas - Hecho con ❤️
      </footer>
    </div>
  );
}