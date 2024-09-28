import React, { useState } from "react";
import {
  MdDashboard,
  MdOutlineLogin,
  MdOutlineRestaurantMenu,
} from "react-icons/md";
import "../styles/Sidebar.css";
import { IoMdMenu } from "react-icons/io";
import { FaClipboardCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar la visibilidad del sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="sidebar-container">
        {/* Botón de menú hamburguesa visible en pantallas pequeñas */}
        <div className="hamburger-menu-nav" onClick={toggleSidebar}>
          {!isOpen ? (
            <IoMdMenu className="btn-menu-nav" />
          ) : (
            <IoClose className="btn-close-nav" />
          )}
          <div className="logo">
            <img src="src/assets/logo-bqqueen-compress.webp" alt="bqLogo" />
          </div>
        </div>

        {/* Sidebar */}
        <nav className={`nav-menu ${isOpen ? "active" : ""}`}>
          <ul className="ul-menu">
            <li>
              <MdDashboard className="icon-list-nav" />
              <a href="/panel">Panel</a>
            </li>
            <li>
              <FaClipboardCheck className="icon-list-nav" />
              <a href="/menu">Menú</a>
            </li>
            <li>
              <MdOutlineRestaurantMenu className="icon-list-nav" />
              <a href="/pedidos">Pedidos</a>
            </li>
          </ul>
          <div className="logout-nav">
            <a href="#">Name - rol </a>
            <div>
              <MdOutlineLogin className="btn-logout-nav" />
              <a href="#">Cerrar Sesión</a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
