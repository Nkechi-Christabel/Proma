import { combineReducers } from "redux";
import { projectsReducers } from "./projectReducers";
import { userReducers } from "./userReducers";

const reducers = combineReducers({
  userInfo: userReducers,
  projects: projectsReducers,
});

export default reducers;
