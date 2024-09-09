const FolderIcon = ({ size }) => {
  const iconSize = {
    big: 128,
    small: 24,
  };

  return (
    <svg
      width={iconSize[size] || 24}
      height={iconSize[size] || 24}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="16" y="36" width="96" height="64" rx="12" fill="#70ADC6" />
      <rect x="16" y="28" width="48" height="48" rx="12" fill="#70ADC6" />
      <rect x="16" y="48" width="96" height="64" rx="12" fill="#97D1E9" />
    </svg>
  );
};

export { FolderIcon };
