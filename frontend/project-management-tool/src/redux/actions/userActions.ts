import axios, { AxiosResponse } from "axios";
import { UserActionTypes } from "../constants/actionTypes";
import { baseUrlApi } from "../../axiosHelper/index";
import { FormValuesSignup } from "../../components/Signup";
import { FormValuesLogin } from "../../components/Login";
// import { authHeader } from "../../axios/services/auth-header";

const instance = axios.create({
  withCredentials: true,
  baseURL: baseUrlApi,
});

const base = axios.create({
  baseURL: baseUrlApi,
});

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
      res = await instance.post("/login", userLoggedIn);
      if (res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      dispatch({
        type: UserActionTypes.USER_LOGIN,
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

export function logout() {
  return (dispatch: any) => {
    localStorage.removeItem("user");
    dispatch({ type: UserActionTypes.LOGOUT });
  };
}

// export const clearError = () => {
//   return (dispatch: any) => {
//     dispatch({ type: UserActionTypes.CLEAR_ERROR });
//   };
// };

// export const logout =
//   () =>
//   async (dispatch: any): Promise<AxiosResponse<any, any>> => {
//     let res: any;
//     try {
//       res = await base.post("/logout");
//       localStorage.removeItem("user");
//       dispatch({
//         type: UserActionTypes.LOGOUT,
//         payload: res.data,
//       });

//       return res;
//     } catch (err: any) {
//       dispatch({
//         type: UserActionTypes.CATCH_ERROR,
//         payload: err,
//       });
//       return (res = err);
//     }
//   };
