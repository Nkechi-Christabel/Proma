import axios, { AxiosResponse } from "axios";
import { UserActionTypes } from "../constants/actionTypes";
import { baseUrlApi } from "../../axios-constant/index";
import { FormValuesSignup } from "../../components/Signup";
import { FormValuesLogin } from "../../components/Login";

const base = axios.create({
  baseURL: baseUrlApi,
});

// export const fetchPosts = () => async (dispatch) => {
//   try {
//     const res = await base.get("products");
//     dispatch({
//       type: FETCH_POSTS,
//       payload: res.data.data,
//     });
//   } catch (e) {
//     dispatch({
//       type: CATCH_ERROR,
//       payload: handleError(e, 5),
//     });
//   }
// };

export const signup =
  (user: FormValuesSignup) =>
  async (dispatch: any): Promise<AxiosResponse<any, any>> => {
    let res: any;
    try {
      res = await base.post("/signup", user);
      dispatch({
        type: UserActionTypes.USER_SIGNUP,
        payload: user,
      });
      return res;
    } catch (err: any) {
      dispatch({
        type: UserActionTypes.CATCH_ERROR,
        payload: err,
      });
      return (res = err);
    }
  };

export const login =
  (userLoggedIn: FormValuesLogin) =>
  async (dispatch: any): Promise<AxiosResponse<any, any>> => {
    let res: any;
    try {
      res = await base.post("/login", userLoggedIn);
      dispatch({
        type: UserActionTypes.USER_LOGIN,
        payload: userLoggedIn,
      });
      return res;
    } catch (err: any) {
      console.log(err);
      dispatch({
        type: UserActionTypes.CATCH_ERROR,
        payload: err,
      });
      return (res = err);
    }
  };

export const getUser =
  () =>
  async (dispatch: any): Promise<AxiosResponse<any, any>> => {
    let res: any;
    try {
      res = await base.get("/user");
      dispatch({
        type: UserActionTypes.USER,
        payload: res.data,
      });
      return res;
    } catch (err: any) {
      dispatch({
        type: UserActionTypes.CATCH_ERROR,
        payload: err,
      });
      return (res = err);
    }
  };

export const clearError = () => {
  return (dispatch: any) => {
    dispatch({ type: UserActionTypes.CLEAR_ERROR });
  };
};

export const logout =
  () =>
  async (dispatch: any): Promise<AxiosResponse<any, any>> => {
    let res: any;
    try {
      res = await base.get("/logout");
      dispatch({
        type: UserActionTypes.LOGOUT,
        payload: res.data,
      });
      console.log(res);
      return res;
    } catch (err: any) {
      console.log(err);
      dispatch({
        type: UserActionTypes.CATCH_ERROR,
        payload: err,
      });
      return (res = err);
    }
  };

// export function logout() {
//   return (dispatch) => {
//     dispatch({ type: LOGOUT });
//   };
// }
