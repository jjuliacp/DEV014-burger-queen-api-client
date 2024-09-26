import React, { useState } from "react";
import "../styles/Sidebar.css";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar la visibilidad del sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Botón de menú hamburguesa visible en mobile */}
      <button className="hamburger-menu" onClick={toggleSidebar}></button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "active" : ""}`}>
        <div className="logo">Burger Queen</div>
        <nav className="nav">
          <a href="#">Panel</a>
          <a href="#">Pedidos</a>
          <a href="#">Menú</a>
          <a href="#">Cerrar Sesión</a>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
