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
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Guardar el índice activo

  // Función para alternar la visibilidad del sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (index: number) => {
    setActiveIndex(index); // Actualizar el índice activo
  };

  return (
    <>
      <div className={`sidebar-container ${isOpen ? "active" : ""}`}>
        {/* Botón de menú hamburguesa visible en pantallas pequeñas */}
        <div className="hamburger-menu-nav" onClick={toggleSidebar}>
          {isOpen ? (
            <IoClose className="btn-close-nav" />
          ) : (
            <IoMdMenu className="btn-menu-nav" />
          )}
          <div className="logo">
            <img src="src/assets/logo-bqqueen-compress.webp" alt="bqLogo" />
          </div>
        </div>

        {/* Sidebar */}
        <nav className={`nav-menu ${isOpen ? "active" : ""}`}>
          <ul className="ulSidebar" id="ul-menu">
            <li
              className={`sidebar-item ${activeIndex === 0 ? "active" : ""}`}
              onClick={() => handleItemClick(0)}
            >
              <MdDashboard className="icon-list-nav" />
              <a className="sidebar-a" href="#">
                Panel
              </a>
            </li>
            <li
              className={`sidebar-item ${activeIndex === 1 ? "active" : ""}`}
              onClick={() => handleItemClick(1)}
            >
              <FaClipboardCheck className="icon-list-nav" />
              <a className="sidebar-a" href="/menu">
                Menú
              </a>
            </li>
            <li
              className={`sidebar-item ${activeIndex === 2 ? "active" : ""}`}
              onClick={() => handleItemClick(2)}
            >
              <MdOutlineRestaurantMenu className="icon-list-nav" />
              <a className="sidebar-a" href="#">
                Pedidos
              </a>
            </li>
          </ul>
          <div className="logout-nav">
            <a className="sidebar-a" href="#">
              Name - rol{" "}
            </a>
            <div>
              <MdOutlineLogin className="btn-logout-nav" />
              <a className="sidebar-a" href="#">
                Cerrar Sesión
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
