import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./Login/loginSlice";

export const store = configureStore({
  reducer: {
    // Add your reducers here
    // Example: user: userReducer,
    login:loginReducer
  },
})


// value  -> useSelector 
// dispatch -> useDispatch