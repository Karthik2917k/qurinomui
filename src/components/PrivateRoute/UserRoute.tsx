type PrivateRouteProps = {
  child: React.FunctionComponentElement<HTMLElement>;
};
import { Navigate } from "react-router-dom";
import { getCookie } from "../../utils/getCookie";
import { jwtDecode } from "jwt-decode";
import { useDataContext } from "../Context/Context";

export default function UserRoute(props: PrivateRouteProps) {
  const context = useDataContext();
  const { child } = props;

  try {
    const token = getCookie("token");
    if (!token) {
      return <Navigate to="/" />;
    }

    const decoded: { id: string; name: string; email: string; role: string } =
      jwtDecode(token);
    if (!decoded || decoded?.role !== "user") {
      return <Navigate to="/" />;
    }
    if (context) {
      const updateUserDetails = context[1];
      updateUserDetails({...decoded,token:token});
    }
    return child;
  } catch (e) {
    return <Navigate to="/" />;
  }
}
