import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import Register from "../Register";
import UserRoute from "../PrivateRoute/UserRoute";
import MerchantRoute from "../PrivateRoute/MerchantRoute";
import Dashboard from "../MerchantDashboard/Dashboard";
import UserDashboard from "../userDashboard/Dashboard";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<UserRoute child={<UserDashboard />} />} />
        <Route
          path="/dashboard"
          element={<MerchantRoute child={<Dashboard />} />}
        />
      </Routes>
    </div>
  );
};

export default AllRoutes;
