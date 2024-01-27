/* eslint-disable @typescript-eslint/no-explicit-any */

import { CategoryTypes } from "./Sidebar";
interface ProductProps {
  setProductName: React.Dispatch<React.SetStateAction<string>>;
  productName: string;
  categories: CategoryTypes[];
  products: any[];
}
const UserProducts = (prop: ProductProps) => {
  const { productName, setProductName, products } = prop;

  return (
    <div className="col-span-3">
      <div className="flex justify-center items-center my-5 gap-5">
        <input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          type="text"
          className="focus:outline-none border-2 border-slate-600 h-10 rounded md:min-w-[500px]"
        />
        <button className="text-white bg-[#0054a6] h-10 px-5 font-semibold rounded-full">
          Search
        </button>
      </div>
      <div className="h-[400px] overflow-auto m-5">
        <div className="grid grid-cols-2 gap-5 ">
          {products &&
            products.map((el) => (
              <div
                style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
                className="px-2 rounded-ee-sm py-3 flex flex-col gap-2"
                key={el.id}
              >
                <img className="w-72 h-72" src={el.image} alt={el.title} />
                <p className="font-semibold">{el.title}</p>
                <p>{el.location}</p>
                <p>Price : {el.price}.00</p>
                <p className="">Category: {el.categorie.name}</p>
                <p className="">Sub Category: {el.subCategorie.name}</p>
                <p className="text-xs text-slate-700">{el.description}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserProducts;
