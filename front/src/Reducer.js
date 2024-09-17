const defaultData = { isAuthenticated: false, user: null, username: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "authorize":
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        username: action.payload.username,
      };
  }
};

export { defaultData, reducer };
