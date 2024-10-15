import "../styles/Layout.css";

// contenedor de secciones
interface ContainerOrdersProps {
  children: React.ReactNode;
}

const Layout: React.FC<ContainerOrdersProps> = ({ children }) => {
  return <main className="layout sectionContainer">{children}</main>;
};

export default Layout;
