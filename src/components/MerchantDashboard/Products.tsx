/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CreateNewProduct from "../Modals/CreateNewProduct";
import { CategoryTypes } from "./Sidebar";
import EditProduct from "../Modals/EditModalProps";
interface ProductProps {
  setProductName: React.Dispatch<React.SetStateAction<string>>;
  productName: string;
  categories: CategoryTypes[];
  products: any[];
  getProducts: () => void;
  deleteProduct?: (id: string) => void;
}
const Products = (prop: ProductProps) => {
  const {
    productName,
    setProductName,
    categories,
    products,
    deleteProduct,
    getProducts,
  } = prop;
  const [isCreateProductModalOpen, setIsCreateaProductModalOpen] =
    useState<boolean>(false);

  const [edittableProductData, setEditableProductData] = useState<string>("");

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const handleEditFunc = (data: any) => {
    setIsEditModalOpen(true);
    setEditableProductData(data);
  };
  const closeEditModal = () => {
    getProducts();
    setIsEditModalOpen(false);
  };
  const closeModal = () => {
    setIsCreateaProductModalOpen(false);
  };

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
      <div className="flex justify-end">
        <button
          className="text-white bg-[#0054a6] px-5 py-2 rounded-md mx-5"
          onClick={() => setIsCreateaProductModalOpen(true)}
        >
          Add New Product
        </button>
      </div>
      <hr className="my-2" />
      {isCreateProductModalOpen && (
        <CreateNewProduct
          categories={categories}
          closeModal={closeModal}
          closable={true}
        />
      )}
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

                <div className="w-full flex px-2 justify-end gap-2">
                  {deleteProduct && (
                    <button
                      className="text-white bg-[#0054a6] px-5 py-2 rounded-lg"
                      onClick={() => deleteProduct(el.id)}
                    >
                      Delete
                    </button>
                  )}
                  <button
                    className="text-white bg-[#0054a6] px-5 py-2 rounded-lg"
                    onClick={() => handleEditFunc(el)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      {isEditModalOpen && (
        <EditProduct
          data={edittableProductData}
          closable={false}
          closeModal={closeEditModal}
        />
      )}
    </div>
  );
};

export default Products;
