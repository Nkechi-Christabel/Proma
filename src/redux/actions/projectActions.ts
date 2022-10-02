import axios, { AxiosResponse } from "axios";
import { ProjectActionTypes } from "../constants/actionTypes";
import { baseUrlApi } from "../../axios-constant/index";

const base = axios.create({
  baseURL: `${baseUrlApi}/project`,
});

// const config = {
//   headers: { "content-type": "multipart/form-data" },
// };

export const projectUpload =
  (project: FormData) =>
  async (dispatch: any): Promise<AxiosResponse<any, any>> => {
    let res: any;
    try {
      res = await base.post("/createProject", project);
      dispatch({
        type: ProjectActionTypes.PROJECT_UPLOAD,
        payload: project,
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

export const projects =
  () =>
  async (dispatch: any): Promise<AxiosResponse<any, any>> => {
    let res: any;
    try {
      res = await base.get("/createProject");
      dispatch({
        type: ProjectActionTypes.ALL_PROJECTS,
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
