import { ProjectActionTypes } from "../constants/actionTypes";

const initialState = {
  loading: true,
  project: [],
  projects: [],
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
        signup: payload,
      };
    case ProjectActionTypes.ALL_PROJECTS:
      return {
        ...state,
        loading: false,
        projects: payload,
      };
    // case UserActionTypes.USER:
    //   return {
    //     ...state,
    //     user: payload,
    //   };
    // case UserActionTypes.LOGOUT:
    //   return {
    //     ...initialState,
    //   };
    case ProjectActionTypes.CATCH_ERROR:
      return {
        error: payload,
      };

    default:
      return state;
  }
};
