import { UserActionTypes } from "../constants/actionTypes";

const initialState = {
  // loading: true,
  isLoggedIn: false,
  error: [],
  signup: [],
  loggedIn: [],
  user: [],
  logout: [],
};

export const userReducers = (
  state = initialState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case UserActionTypes.USER_SIGNUP:
      return {
        ...state,
        isLoggedIn: false,
        signup: payload,
      };
    case UserActionTypes.USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        loggedIn: payload,
      };
    // case UserActionTypes.USER:
    //   return {
    //     ...state,
    //     isLoggedIn: true,
    //     user: [...state.user, payload],
    //   };

    case UserActionTypes.CATCH_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        error: payload,
      };

    case UserActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: [],
      };
    case UserActionTypes.LOGOUT:
      return {
        ...initialState,
        logout: payload,
      };
    default:
      return state;
  }
};

// export const errorReducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case CLEAR_ERROR:
//       return {
//         ...state,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };
