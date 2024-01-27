import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { EditModalProps, editProductTypes } from "./Modal.types";
import { useDataContext } from "../Context/Context";
import axios from "axios";

export default function EditProduct(props: EditModalProps) {
  const { closeModal, closable = true, data } = props;
  const context = useDataContext();

  const productInitilState: editProductTypes = {
    id:data.id,
    location: data.location,
    price: data.price,
    image: data.image,
    description: data.description,
    title: data.title,
  };

  const [productData, setProductData] =
    useState<editProductTypes>(productInitilState);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleEditProduct = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { id, ...rest } = productData;
      const url = `${import.meta.env.VITE_SERVER_URL}/products/update/${id}`;
      await axios.patch(url, rest, {
        headers: {
          Authorization: context ? context[0].token : "",
        },
      });
      closeModal && closeModal();
    } catch (err) {
      console.log(err);
    }
  };
  console.log();
  return (
    <Fragment>
      <div className="fixed left-0 top-0 z-20 flex h-screen w-full select-none items-center justify-center bg-slate-800 bg-opacity-50 backdrop-blur-sm">
        <div className="h-max  max-h-[calc(100%-50px)] w-[90%] overflow-y-scroll whitespace-pre-wrap rounded-lg border bg-white p-4 md:mt-5 lg:w-max ">
          <div className="w-[500px]">
            {closable && (
              <p
                className="ml-auto w-max cursor-pointer border"
                onClick={closeModal}
              >
                <IoIosClose className="h-8 w-8" />
              </p>
            )}
            <div>
              <p className="text-[#0054a6] text-2xl font-semibold">
                Edit Product
              </p>

              <form onSubmit={handleEditProduct}>
                <div className="flex flex-col gap-1">
                  <label className="text-lg font-semibold text-[#0054a6]">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    className="h-10 focus:outline-none border-2 px-2 border-slate-700 rounded"
                    value={productData.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-lg font-semibold text-[#0054a6]">
                    Price
                  </label>
                  <input
                    min={0}
                    name="price"
                    max={10000}
                    required
                    type="number"
                    className="h-10 focus:outline-none border-2 px-2 border-slate-700 rounded"
                    value={productData.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-lg font-semibold text-[#0054a6]">
                    Image
                  </label>
                  <input
                    type="text"
                    className="h-10 focus:outline-none border-2 px-2 border-slate-600 rounded"
                    value={productData.image}
                    name="image"
                    required
                    onChange={handleChange}
                    placeholder="Paste image url..."
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-lg font-semibold text-[#0054a6]">
                    Location
                  </label>
                  <input
                    type="text"
                    className="h-10 focus:outline-none border-2 px-2 border-slate-700 rounded"
                    name="location"
                    required
                    value={productData.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-lg font-semibold text-[#0054a6]">
                    Description
                  </label>
                  <textarea
                    className="h-10 focus:outline-none border-2 px-2 border-slate-700 rounded"
                    name="description"
                    required
                    value={productData.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="my-5 flex justify-end ">
                  <button className="text-white bg-[#0054a6] px-5 py-1 rounded">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
