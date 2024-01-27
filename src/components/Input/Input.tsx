import { ChangeEvent } from "react";

interface InputProps {
  name: string;
  value: string | number;
  type: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const Input = (props: InputProps) => {
  const { handleChange, name, value, type } = props;
  return (
    <div className="my-5 w-11/12 m-auto">
      <label className="font-semibold capitalize">{name}</label>
      <input
        className="focus:outline-none h-10 px-2 font-medium rounded-sm border w-full"
        type={type}
        name={name}
        placeholder={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
