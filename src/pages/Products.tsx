import { useGetProductsQuery } from "../redux/services/mainApi";

const Products: React.FC = () => {
  const { data: products = [], isLoading, error } = useGetProductsQuery();
  console.log({ products, isLoading });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <div>
      <h1>Products Page</h1>
      <p>This is the Products page.</p>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
