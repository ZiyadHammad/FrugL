import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const MyProducts = () => {
  const { userProducts } = useSelector((state) => state.items);

  return (
    <section className="flex flex-col gap-10 px-6 pt-10 lg:pt-0">
      <h2 className="text-primary text-[32px] font-semibold text-center md:text-start lg:border-b">
        My Products
      </h2>

      <div className="flex flex-wrap gap-x-8 gap-y-16 justify-center md:justify-start">
        {userProducts.length ? (
          userProducts.map((product) => (
            
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </section>
  );
};

export default MyProducts;
