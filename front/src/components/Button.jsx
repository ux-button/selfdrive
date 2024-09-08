const Button = ({ children, handleSubmit }) => {
  return (
    <button
      className="px-4 py-2 bg-purple-700 text-white rounded-lg"
      onClick={handleSubmit}
    >
      {children}
    </button>
  );
};

export { Button };
