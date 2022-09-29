import { UserActionTypes } from "../constants/actionTypes";

const initialState = {
  // loading: true,
  error: [],
  signup: [],
  login: [],
  user: [],
};

export const userReducers = (
  state = initialState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case UserActionTypes.USER_SIGNUP:
      return {
        ...state,
        signup: payload,
      };
    case UserActionTypes.USER_LOGIN:
      return {
        ...state,
        login: payload,
      };
    case UserActionTypes.USER:
      return {
        ...state,
        user: payload,
      };
    case UserActionTypes.LOGOUT:
      return {
        ...initialState,
      };
    case UserActionTypes.CATCH_ERROR:
      return {
        error: payload,
      };
    case UserActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: [],
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
