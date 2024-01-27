import { getCookie } from "../../utils/getCookie";
import { jwtDecode } from "jwt-decode";
import { useDataContext } from "../Context/Context";
import { Navigate } from "react-router-dom";
type PrivateRouteProps = {
  child: React.FunctionComponentElement<HTMLElement>;
};
export default function MerchantRoute(props: PrivateRouteProps) {
  const context = useDataContext();
  const { child } = props;

  try {
    const token = getCookie("token");
    if (!token) {
      return <Navigate to="/" />;
    }

    const decoded: { id: string; name: string; email: string; role: string } =
      jwtDecode(token);
    if (!decoded || decoded.role !== "merchant") {
      return <Navigate to="/" />;
    }
    if (context) {
      const updateUserDetails = context[1];
      updateUserDetails({ ...decoded, token: token });
    }
    return child;
  } catch (e) {
    return <Navigate to="/" />;
  }
}
