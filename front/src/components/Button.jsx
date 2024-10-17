const Button = ({ children, handleSubmit, style }) => {
  const buttonType = {
    default: "px-4 py-2 bg-purple-700 text-white rounded-lg text-base w-fit",
    shadow: "px-4 py-2 bg-purple-2 text-purple-700 rounded-lg text-base w-fit",
  };
  return (
    <button
      className={style ? buttonType[type] : buttonType.default}
      onClick={handleSubmit}
    >
      {children}
    </button>
  );
};

export { Button };
