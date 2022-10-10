import axios, { AxiosResponse } from "axios";
import { ProjectActionTypes } from "../constants/actionTypes";
import { baseUrlApi } from "../../axiosHelper/index";
import { authHeader } from "../../axiosHelper/services/auth-header";

const instance = axios.create({
  withCredentials: true,
  baseURL: `${baseUrlApi}/projects`,
});

export const projectUpload =
  (project: FormData) =>
  async (dispatch: any): Promise<AxiosResponse<any, any>> => {
    let res: any;
    try {
      res = await instance.post("/", project, authHeader());
      dispatch({
        type: ProjectActionTypes.PROJECT_UPLOAD,
        payload: res.data,
      });

      return res;
    } catch (err: any) {
      dispatch({
        type: ProjectActionTypes.CATCH_ERROR,
        payload: err,
      });
      return (res = err);
    }
  };

export const userProject =
  () =>
  async (dispatch: any): Promise<AxiosResponse<any, any>> => {
    let res: any;
    try {
      res = await instance.get("/userProjects", authHeader());

      dispatch({
        type: ProjectActionTypes.USER_PROJECTS,
        payload: res.data,
      });

      return res;
    } catch (err: any) {
      dispatch({
        type: ProjectActionTypes.CATCH_ERROR,
        payload: err,
      });
      return (res = err);
    }
  };

export const allProjects =
  () =>
  async (dispatch: any): Promise<AxiosResponse<any, any>> => {
    let res: any;
    try {
      res = await instance.get("/allProjects");

      dispatch({
        type: ProjectActionTypes.ALL_PROJECTS,
        payload: res.data,
      });

      return res;
    } catch (err: any) {
      dispatch({
        type: ProjectActionTypes.CATCH_ERROR,
        payload: err,
      });
      return (res = err);
    }
  };

export const singleProject =
  (param: string | undefined) =>
  async (dispatch: any): Promise<AxiosResponse<any, any>> => {
    let res: any;
    try {
      res = await instance.get(`/${param}`, authHeader());

      dispatch({
        type: ProjectActionTypes.SINGLE_PROJECT,
        payload: res.data,
      });
      console.log(res);
      return res;
    } catch (err: any) {
      console.log(err);
      dispatch({
        type: ProjectActionTypes.CATCH_ERROR,
        payload: err,
      });
      return (res = err);
    }
  };

export const deleteProject =
  (param: string | undefined) =>
  async (dispatch: any): Promise<AxiosResponse<any, any>> => {
    let res: any;
    try {
      res = await instance.delete(`delete/${param}`, authHeader());

      dispatch({
        type: ProjectActionTypes.DELETE_PROJECT,
        payload: res.data,
      });

      return res;
    } catch (err: any) {
      dispatch({
        type: ProjectActionTypes.CATCH_ERROR,
        payload: err,
      });
      return (res = err);
    }
  };

export const updateProject =
  (param: string | undefined) =>
  async (dispatch: any): Promise<AxiosResponse<any, any>> => {
    let res: any;
    try {
      res = await instance.put(`update/${param}`, authHeader());

      dispatch({
        type: ProjectActionTypes.UPDATE_PROJECT,
        payload: res.data,
      });
      return res;
    } catch (err: any) {
      dispatch({
        type: ProjectActionTypes.CATCH_ERROR,
        payload: err,
      });
      return (res = err);
    }
  };
