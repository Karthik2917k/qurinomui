import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Sidebar, { CategoryTypes } from "./Sidebar";
import Products from "./Products";
import axios from "axios";
import { useDataContext } from "../Context/Context";

const Dashboard = () => {
  const context = useDataContext();
  const [productName, setProductName] = useState<string>("");
  const [categories, setCategories] = useState<CategoryTypes[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    []
  );
  const [products, setProducts] = useState([]);
  const [location, setLocation] = useState<string>("");
  const [minValue, setMinValue] = useState(10);
  const [maxValue, setMaxValue] = useState(10000);

  const handleCategorySelection = (categoryId: string): void => {
    // Toggle selected category
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleSubCategorySelection = (subCategoryId: string) => {
    // Toggle selected subcategory
    if (selectedSubCategories.includes(subCategoryId)) {
      setSelectedSubCategories(
        selectedSubCategories.filter(
          (subCategory) => subCategory !== subCategoryId
        )
      );
    } else {
      setSelectedSubCategories([...selectedSubCategories, subCategoryId]);
    }
  };

  const getProductData = async () => {
    try {
      const categories = selectedCategories
        .map((category) => `categories=${encodeURIComponent(category)}`)
        .join("&");
      const subCategories = selectedSubCategories
        .map((sc) => `subCategories=${encodeURIComponent(sc)}`)
        .join("&");
      const url = `${
        import.meta.env.VITE_SERVER_URL
      }/products?search=${productName}&min=${minValue}&max=${
        maxValue == 100 ? 1000 : maxValue
      }&${categories}&${subCategories}&location=${location}`;
      const response = await axios.get(url);
      setProducts(response.data.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log("Error while fetching product data", e.message);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/products/delete/${id}`;
      await axios.delete(url, {
        headers: {
          Authorization: context ? context[0].token : "",
        },
      });
      await getProductData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await getProductData();
    }
    fetchData();
  }, [
    productName,
    selectedCategories,
    selectedSubCategories,
    maxValue,
    location,
    minValue,
  ]);
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />

      <div className="grid grid-cols-4">
        <Sidebar
          categories={categories}
          location={location}
          selectedCategories={selectedCategories}
          selectedSubCategories={selectedSubCategories}
          setCategories={setCategories}
          setLocation={setLocation}
          setMaxValue={setMaxValue}
          setMinValue={setMinValue}
          handleCategorySelection={handleCategorySelection}
          handleSubCategorySelection={handleSubCategorySelection}
        />
        <Products
          getProducts={getProductData}
          deleteProduct={deleteProduct}
          products={products}
          productName={productName}
          categories={categories}
          setProductName={setProductName}
        />
      </div>
    </div>
  );
};

export default Dashboard;
