import "../src/styles/settings.css"; // 🔥 Importamos los estilos

export default function Settings() {
  return (
    <div className="settings-container">
      <h2 className="settings-title">⚙️ Configuración</h2>
      <p className="settings-text">
        Aquí podrás modificar ajustes de la aplicación en el futuro.
      </p>
    </div>
  );
}