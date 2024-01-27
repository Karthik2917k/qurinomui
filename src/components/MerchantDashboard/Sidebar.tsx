import axios from "axios";
import { useEffect } from "react";
import { useDataContext } from "../Context/Context";
import { IoIosArrowDown } from "react-icons/io";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export interface CategoryTypes {
  id: string;
  name: string;
  SubCategory: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
}

interface SidebarProps {
  selectedCategories: string[];
  selectedSubCategories: string[];
  location: string;
  categories: CategoryTypes[];
  setMaxValue: React.Dispatch<React.SetStateAction<number>>;
  setMinValue: React.Dispatch<React.SetStateAction<number>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setCategories: React.Dispatch<React.SetStateAction<CategoryTypes[]>>;
  handleCategorySelection:(categoryId: string)=>void;
  handleSubCategorySelection:(subCategoryId: string)=>void
}

const Sidebar = (prop: SidebarProps) => {
  const {
    categories,
    location,
    selectedCategories,
    selectedSubCategories,
    setMaxValue,
    setMinValue,
    setCategories,
    setLocation,
    handleSubCategorySelection,
    handleCategorySelection
  } = prop;
  const context = useDataContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSliderChange = (e: any) => {
    setMaxValue(e[1]);
    setMinValue(e[0]);
  };

  const handleCategory = async () => {
    try {
      if (context) {
        const url = `${import.meta.env.VITE_SERVER_URL}/category`;
        const response = await axios.get(url, {
          headers: { Authorization: context[0].token },
        });
        setCategories(response.data.data);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log("Error:", e.message);
    }
  };


  useEffect(() => {
    async function fetchData() {
      await handleCategory();
    }
    fetchData();
  }, [context]);

  return (
    <div
      className="col-span-1 h-screen sticky top-16 p-5"
      style={{ boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px" }}
    >
      <div>
        <p className="text-lg font-semibold">Category</p>
        {categories &&
          categories.map((el) => (
            <div
              key={el.id}
              className="group font-medium cursor-pointer text-lg"
            >
              {/* Container for the collapsible section with dynamic height transition */}
              <div
                className={`h-10 overflow-hidden transition-all duration-300 ease-in group-hover:h-max`}
              >
                {/* Header section with title and arrow indicator */}
                <div className={`flex justify-between px-4`}>
                  <div className="flex gap-2 justify-between h-10 overflow-hidden transition-all duration-300 ease-in group-hover:h-max">
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(el.id)}
                        onChange={() => handleCategorySelection(el.id)}
                      />
                      <p>{el.name}</p>
                    </div>
                  </div>

                  <IoIosArrowDown className="text-2xl -rotate-90 group-hover:rotate-0 transition ease-in" />
                </div>
                {/* Subtabs section */}
                <div>
                  {/* Mapping through subTabs array to create individual Link elements */}
                  {el.SubCategory.map((subCategory) => (
                    <div key={subCategory.id} className="flex gap-3 pl-10">
                      <input
                        type="checkbox"
                        checked={selectedSubCategories.includes(subCategory.id)}
                        onChange={() =>
                          handleSubCategorySelection(subCategory.id)
                        }
                      />
                      <p>{subCategory.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div>
        <p className="text-lg font-semibold">Location</p>
        <input
          type="text"
          value={location}
          className="w-full border focus:outline-none h-8 rounded"
          placeholder="location..."
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div>
        <p className="text-lg font-semibold">Price</p>
        <Slider
          range
          defaultValue={[0, 10000]}
          min={0}
          max={10000}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  );
};

export default Sidebar;
