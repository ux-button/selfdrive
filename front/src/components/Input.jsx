const Input = ({ label, value, style, placeholder, handleChange }) => {
  const inputType = {
    default: "bg-slate-100 px-4 py-4 rounded-lg",
    error: "bg-red-100 px-4 py-4 border border-red-400 rounded-lg",
  };
  return (
    <input
      className={inputType[style]}
      value={value}
      name={label}
      placeholder={placeholder}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};

export { Input };