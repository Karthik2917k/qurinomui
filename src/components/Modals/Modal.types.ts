import { CategoryTypes } from "../MerchantDashboard/Sidebar";

export type ModalProps = {
  closeModal?: () => void;
  categories:CategoryTypes[];
  closable?: boolean;
};


export type EditModalProps = {
  closeModal?: () => void;
  closable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data:any
};


export type newProductTypes = {
  location: string;
  price: string;
  image: string;
  description: string;
  title: string;
  merchantId: string;
  subcategoryId: string;
  categoryId: string;
};

export type editProductTypes = {
  id:string;
  location: string;
  price: string;
  image: string;
  description: string;
  title: string;
};
