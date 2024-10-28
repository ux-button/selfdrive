const TickIcon = ({ size, style }) => {
  return (
    <svg
      className={style || "fill-green-500"}
      width="16"
      height="16"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M43.2109 10.7806C40.4772 8.04693 36.0451 8.04693 33.3114 10.7806L18.8062 25.2858L14.1658 20.6454C11.4321 17.9117 6.99999 17.9117 4.26632 20.6454C1.53265 23.3791 1.53265 27.8112 4.26632 30.5449L13.4587 39.7373C13.9207 40.1992 14.4311 40.5831 14.9736 40.8889C17.6974 42.7379 21.4355 42.4555 23.8493 40.0417L43.2109 20.6801C45.9446 17.9464 45.9446 13.5143 43.2109 10.7806Z" />
    </svg>
  );
};

export { TickIcon };
