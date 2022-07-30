type Props = {
  placeholder?: string;
  type?: string;
  name?: string;
  id?: string;
  className?: string;
};

const Input = (props: Props) => {
  return (
    <input
      type={props.type ?? "text"}
      name={props.name}
      id={props.id}
      className={`${props.className} shadow-sm focus:ring-accent focus:border-accent block w-full border-gray-300 rounded-xl`}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
