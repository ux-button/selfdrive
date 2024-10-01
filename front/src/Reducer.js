const defaultData = { isAuthenticated: false, username: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "authorize":
      return {
        ...state,
        isAuthenticated: true,
        username: action.payload.username,
      };
      break;
    case "unauthorize":
      return {
        ...state,
        isAuthenticated: false,
        username: null,
      };
  }
};

export { defaultData, reducer };
