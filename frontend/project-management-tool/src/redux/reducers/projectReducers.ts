import { ProjectActionTypes } from "../constants/actionTypes";

interface State {
  loading: boolean;
  error: any;
  upload: string[];
  projects: string[];
  userProjects: string[];
  aProject: string[];
  delProject: string[];
  editProject: string[];
}

const initialState: State = {
  loading: true,
  error: null,
  upload: [],
  projects: [],
  userProjects: [],
  aProject: [],
  delProject: [],
  editProject: [],
};

export const projectsReducers = (
  state = initialState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case ProjectActionTypes.PROJECT_UPLOAD:
      return {
        ...state,
        loading: false,
        error: null,
        upload: payload,
      };
    case ProjectActionTypes.USER_PROJECTS:
      return {
        ...state,
        loading: false,
        error: null,
        userProjects: payload,
      };
    case ProjectActionTypes.ALL_PROJECTS:
      return {
        ...state,
        loading: false,
        error: null,
        projects: payload,
      };
    case ProjectActionTypes.SINGLE_PROJECT:
      return {
        ...state,
        loading: false,
        error: null,
        aProject: payload,
      };
    case ProjectActionTypes.DELETE_PROJECT:
      return {
        ...state,
        loading: false,
        error: null,
        delProject: payload,
      };
    case ProjectActionTypes.UPDATE_PROJECT:
      return {
        ...state,
        loading: false,
        error: null,
        editProject: payload,
      };

    // case UserActionTypes.LOGOUT:
    //   return {
    //     ...initialState,
    //   };
    case ProjectActionTypes.CATCH_ERROR:
      return {
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
