import React, { useEffect, useState } from "react";
import {
  MdDashboard,
  MdOutlineLogin,
  MdOutlineRestaurantMenu,
} from "react-icons/md";
import "../styles/Sidebar.css";
import { IoMdMenu } from "react-icons/io";
import { FaClipboardCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getUserRole } from "../utils/localstorage";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Guardar el índice activo
  const [role, setRole] = useState<string>("");
  // Función para alternar la visibilidad del sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  // Efecto para actualizar el índice activo basado en la ruta actual
  useEffect(() => {
    switch (location.pathname) {
      case "/panel":
        setActiveIndex(0);
        break;
      case "/menu":
        setActiveIndex(1);
        break;
      case "/orders":
        setActiveIndex(2);
        break;
      default:
        setActiveIndex(null);
        break;
    }
    setRole(getUserRole());
  }, [location.pathname]); // Dependencia de location

  const handleItemClick = (index: number) => {
    setActiveIndex(index); // Actualizar el índice activo
    setIsOpen(false);
  };

  return (
    <>
      <aside className={`sidebar-container ${isOpen ? "active" : ""}`}>
        {/* Botón de menú hamburguesa visible en pantallas pequeñas */}
        <div className="hamburger-menu-nav">
          {isOpen ? (
            <IoClose
              className="btn-close-nav"
              onClick={toggleSidebar}
              aria-label="Cerrar menú"
            />
          ) : (
            <IoMdMenu
              className="btn-menu-nav"
              onClick={toggleSidebar}
              aria-label="Abrir menú"
            />
          )}
          <div className="logo">
            <img src="src/assets/logo-bqqueen-compress.webp" alt="bqLogo" />
          </div>
        </div>

        {/* Sidebar */}
        <nav className={`nav-menu ${isOpen ? "active" : ""}`}>
          <ul className="ulSidebar" id="ul-menu">
            {role === "waiter" && (
              <li
                className={`sidebar-item ${activeIndex === 0 ? "active" : ""}`}
                onClick={() => handleItemClick(0)}
              >
                <MdDashboard className="icon-list-nav" />
                <Link className="sidebar-a" to="/panel">
                  Panel
                </Link>
              </li>
            )}
            {role === "chef" && (
              <li
                className={`sidebar-item ${activeIndex === 0 ? "active" : ""}`}
                onClick={() => handleItemClick(0)}
              >
                <MdDashboard className="icon-list-nav" />
                <Link className="sidebar-a" to="/chef_panel">
                  Panel
                </Link>
              </li>
            )}
            <li
              className={`sidebar-item ${activeIndex === 1 ? "active" : ""}`}
              onClick={() => handleItemClick(1)}
            >
              <FaClipboardCheck className="icon-list-nav" />
              <Link className="sidebar-a" to="/menu">
                Menú
              </Link>
            </li>
            {(role === "waiter" || role === "admin") && (
              <li
                className={`sidebar-item ${activeIndex === 2 ? "active" : ""}`}
                onClick={() => handleItemClick(2)}
              >
                <MdOutlineRestaurantMenu className="icon-list-nav" />
                <Link className="sidebar-a" to="/orders">
                  Pedidos
                </Link>
              </li>
            )}
            {/* Enlace solo para chefs */}
            {role === "chef" && (
              <li
                className={`sidebar-item ${activeIndex === 3 ? "active" : ""}`}
                onClick={() => handleItemClick(3)}
              >
                <MdOutlineRestaurantMenu className="icon-list-nav" />
                <Link className="sidebar-a" to="/kitchen_orders">
                  Pedidos Cocina
                </Link>
              </li>
            )}
          </ul>
          <div className="logout-nav">
            <span className="sidebar-a">Name - rol </span>
            <div>
              <MdOutlineLogin className="btn-logout-nav" />
              <Link className="sidebar-a" to="/logout">
                Cerrar Sesión
              </Link>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
