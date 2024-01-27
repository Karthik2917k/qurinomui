import { Link } from "react-router-dom";
import { useDataContext } from "./Context/Context";
import { removeCookie } from "../utils/getCookie";

const Navbar = () => {
  const context = useDataContext();
  const handleLogout = () => {
    if (context) {
      const updateUserDetails = context[1];
      updateUserDetails({ id: "", name: "", role: "", email: "", token: "" });
    }
    removeCookie("token");
  };
  return (
    <div
      className=" w-full h-16"
      style={{ boxShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px" }}
    >
      <div className="w-11/12 md:w-10/12 m-auto flex justify-between items-center h-16">
        <div>
          <p className="text-xl font-semibold text-[#0054a6]">Qs</p>
        </div>

        {context && context[0].name ? (
          <div className="text-lg text-[#0054a6] font-semibold flex gap-3 items-center">
            <p>{context && context[0]?.name}</p>
            <button
              onClick={handleLogout}
              className="bg-[#0054a6] text-white px-5 py-1 rounded-full"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button className="bg-[#0054a6] hover:bg-blue-100 hover:border hover:border-[#0054a6] hover px-5 py-2 rounded-md text-white hover:text-[#0054a6] font-semibold">
              Login
            </button>

            <Link to="/register">
              <button className="bg-[#0054a6] hover:bg-blue-100 hover:border hover:border-[#0054a6] hover px-5 py-2 rounded-md text-white hover:text-[#0054a6] font-semibold">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
