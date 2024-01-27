import { createContext, ReactNode, useContext, useState, useMemo } from "react";

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
  token:string;
};

const initialSate: User = {
  id: "",
  email: "",
  name: "",
  role: "",
  token:""
};
export type DataContextType = [User, (newDetails: User) => void];

export const DataContext = createContext<DataContextType>([
  initialSate,
  () => {},
]);

type DataProviderProps = {
  children: ReactNode;
};

export const DataProvider = ({ children }: DataProviderProps) => {
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    role: "",
    token:""
  });

  const updateUserDetails = (newDetails: User) => {
    if (
      user.email !== newDetails.email ||
      user.id !== newDetails.id ||
      user.name !== newDetails.name ||
      user.role !== newDetails.role
    ) {
      setUser((prevUser) => ({
        ...prevUser,
        ...newDetails,
      }));
    }
  };

  const contextValue: DataContextType = useMemo(
    () => [user, updateUserDetails],
    [user]
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useDataContext = () => {
  try {
    const context = useContext(DataContext);
    if (!context) {
      throw new Error("useDataContext must be used within a DataProvider");
    }
    return context;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return;
    console.error(err.message);
  }
};
