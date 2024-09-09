const FileIcon = ({ size }) => {
  const iconSize = {
    big: 128,
    small: 24,
  };
  return (
    <>
      <svg
        width={iconSize[size] || 24}
        height={iconSize[size] || 24}
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="24" y="16" width="80" height="96" rx="12" fill="#EDE9D5" />
        <path
          d="M68 64H104L56 16V52C56 58.6274 61.3726 64 68 64Z"
          fill="#DCD8C0"
        />
      </svg>
    </>
  );
};

export { FileIcon };
