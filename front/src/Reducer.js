const defaultData = { isAuthenticated: false, user: null, username: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "authorize":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        username: action.payload.username,
      };
      break;
    case "unauthorize":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        username: null,
      };
  }
};

export { defaultData, reducer };
