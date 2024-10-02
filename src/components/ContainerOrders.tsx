import "../styles/ContainerOrders.css";
// interface Order {
//   id: number;
//   item: string;
//   quantity: number;
// }

// const orders: Order[] = [
//   { id: 1, item: "Item 1", quantity: 2 },
//   { id: 2, item: "Item 2", quantity: 5 },
//   { id: 3, item: "Item 3", quantity: 1 },
// ];
interface ContainerOrdersProps {
  children: React.ReactNode;
}

const ContainerOrders: React.FC<ContainerOrdersProps> = ({ children }) => {
  return <section className="orderContainer">{children}</section>;
};
export default ContainerOrders;
