import { combineReducers } from "redux";
import { dayReducer } from "./slices/day/daySlice";
import { nearbyReducer } from "./slices/nearby/nearbySlice";

const rootReducer = combineReducers({
  day: dayReducer,
  nearby: nearbyReducer,
});

export default rootReducer;
