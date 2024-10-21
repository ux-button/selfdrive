const CopyIcon = ({ size }) => {
  return (
    <svg
      className="fill-slate-300"
      width={size || 24}
      height={size || 24}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 4C7.58172 4 4 7.58172 4 12V25C4 29.4183 7.58172 33 12 33H13C14.6569 33 16 34.3431 16 36V36C16 40.4183 19.5817 44 24 44H36C40.4183 44 44 40.4183 44 36V24C44 19.5817 40.4183 16 36 16V16C34.3431 16 33 14.6569 33 13V12C33 7.58172 29.4183 4 25 4H12Z" />
    </svg>
  );
};

export { CopyIcon };
