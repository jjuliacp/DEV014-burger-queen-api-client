import "../styles/Layout.css";

// contenedor de secciones
interface ContainerOrdersProps {
  children: React.ReactNode;
}

const Layout: React.FC<ContainerOrdersProps> = ({ children }) => {
  return (
    <div className="layout">
      <main className="sectionContainer">{children}</main>
    </div>
  );
};

export default Layout;
