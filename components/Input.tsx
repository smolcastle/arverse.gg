type Props = {
  placeholder?: string;
  type?: string;
  name?: string;
  id?: string;
  className?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const Input = (props: Props) => {
  return (
    <input
      type={props.type ?? "text"}
      name={props.name ?? "text"}
      id={props.id ?? "text"}
      className={`${props.className} shadow-sm focus:ring-accent focus:border-accent block w-full border-gray-300 rounded-xl`}
      placeholder={props.placeholder ?? "Enter here..."}
      value={props.value ?? ""}
      onChange={props.onChange}
    />
  );
};

export default Input;
