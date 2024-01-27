import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import Navbar from "./Navbar";
import Input from "./Input/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginTypes {
  email: string;
  password: string;
}

const initialState: LoginTypes = {
  email: "",
  password: "",
};

const Home = () => {
  const [tab, setTab] = useState<number>(1);
  const [data, setdata] = useState<LoginTypes>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const handleUserSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/user/login`;
      await axios.post(url, data, { withCredentials: true });
      setLoading(false);
      navigate("/products");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setLoading(false);
      console.log("Error User LOGIN", err.message);
    }
  };

  const handleMerchantForm = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/merchant/login`;
      await axios.post(url, data, { withCredentials: true });
      setLoading(false);
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setLoading(false);
      console.log("Error User LOGIN", err.message);
    }
  };
  return (
    <Fragment>
      <Navbar />
      <div className="w-full h-[80vh] flex justify-center items-center">
        <div style={{ boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px" }}>
          <div className="md:w-[500px]">
            <div className="grid grid-cols-2 border border-[#0054a6]">
              <button
                className={`${
                  tab == 1 ? "bg-[#0054a6] text-white" : "text-[#0054a6]"
                } py-2 font-semibold`}
                onClick={() => setTab(1)}
              >
                User Login
              </button>
              <button
                className={`${
                  tab == 2 ? "bg-[#0054a6] text-white" : "text-[#0054a6]"
                } py-2 font-semibold`}
                onClick={() => setTab(2)}
              >
                Merchant Login
              </button>
            </div>
            <div>
              {tab === 1 ? (
                <form onSubmit={handleUserSubmit}>
                  <Input
                    name={"email"}
                    handleChange={handleChange}
                    type="email"
                    value={data.email}
                  />
                  <Input
                    name={"password"}
                    handleChange={handleChange}
                    type="password"
                    value={data.password}
                  />

                  <div className="w-11/12 m-auto">
                    <button
                      className="w-full bg-[#0054a6] py-2 rounded-md my-3 text-white"
                      disabled={loading}
                    >
                      {loading ? "Submiting ..." : "Submit"}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleMerchantForm}>
                  <Input
                    name={"email"}
                    handleChange={handleChange}
                    type="email"
                    value={data.email}
                  />
                  <Input
                    name={"password"}
                    handleChange={handleChange}
                    type="password"
                    value={data.password}
                  />

                  <div className="w-11/12 m-auto">
                    <button className="w-full bg-[#0054a6] py-2 rounded-md my-3 text-white">
                      {loading ? "Submiting ..." : "Submit"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
