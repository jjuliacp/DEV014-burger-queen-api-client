import Layout from "./Layout";
import Menu from "./Menu";

const MenuPage: React.FC = () => {
  return (
    <>
      <main>
        <Layout>
          <Menu />
        </Layout>
      </main>
    </>
  );
};

export default MenuPage;
