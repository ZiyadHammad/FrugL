import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCreateProductMutation } from "../slices/productsApiSlice";

import Loader from "../components/Loader";
import Scene from "../components/Canvas/Scene";

const Scraper = () => {
  const [productUrl, setProductUrl] = useState("");
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await createProduct({ url: productUrl }).unwrap();
    navigate("/products");
    try {
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-theme h-screen w-full p-10">
      <h2 className="text-primary text-[32px] font-semibold text-center lg:text-start border-b">
        Scraper
      </h2>

      <div className="border bg-white rounded-xl max-w-[600px] mt-20 mx-auto shadow-md border-gray-200 p-6">
        <div className="min-h-[250px] flex items-center">
          <Scene />
        </div>

        <form onSubmit={handleSubmit} className="pt-4">
          <div className="mb-2">
            <label
              htmlFor="product-url"
              className="text-sm font-bold text-gray-700"
            >
              Paste your Product URL from Amazon
            </label>
          </div>

          <div className="flex items-center w-full px-3 py-2 border rounded-lg transition text-md gap-2 flex-1 h-11 shadow-xs bg-white border-gray-300">
            <input
              id="product-url"
              onChange={(e) => setProductUrl(e.target.value)}
              value={productUrl}
              name="productUrl"
              type="text"
              placeholder="Example: https://www.amazon.com/PlayStation%C2%AE5..."
              className="flex-1 focus:outline-none bg-inherit border-0 disabled:cursor-not-allowed overflow-hidden text-gray-900 placeholder-gray-500 disabled:text-gray-500 disabled:placeholder-gray-500"
            />
          </div>

          <div className="flex flex-col justify-end mt-6 flex-wrap-reverse">
            <button
              type="submit"
              className="relative inline-flex align-middle justify-center items-center font-semibold border outline-none whitespace-nowrap transition focus:outline-none disabled:cursor-not-allowed active:shadow-none hover:no-underline rounded-lg text-white hover:text-white bg-secondary hover:bg-secondary-700 disabled:bg-secondary-200 border-secondary hover:border-primary-700 disabled:border-primary-200 shadow-xs focus:shadow-focus focus:shadow-primary-100 text-md h-11 min-w-24 px-4.5 py-2.5 w-full max-w-full"
            >
              Start Extraction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Scraper;
