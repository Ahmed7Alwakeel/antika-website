import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Cookies from "js-cookie";
import { TUser } from "../../types/types";


interface AuthDataState {
    userToken: string | null;
    userData: TUser;
    currentUserType: string | null;
  }
  const initialState: AuthDataState = {
    userToken: null,
    userData: {},
    currentUserType: null,
  };


  const authDataSlice = createSlice({
    name: 'authData',
    initialState,
    reducers: {
      setUserToken: (state, action: PayloadAction<string | null>) => {
        state.userToken = action.payload;
      },
      setUserData: (state, action: PayloadAction<TUser>) => {
        state.userData = action.payload;
      },
      handleLogout: (state) => {
        state.userToken = null;
        state.userData = {};
        state.currentUserType = null;
        const removeSessionStorageItemsStartingWith = (prefix:string) => {
          // Iterate through all keys in sessionStorage
          for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
        
            // Check if the key starts with the specified prefix
            if (key && key.startsWith(prefix)) {
              sessionStorage.removeItem(key); // Remove the item
            }
          }
        };
        
        // Remove items with keys starting with 'cart'
        removeSessionStorageItemsStartingWith('cartItem');
      
        // Remove cookies
        const cookies = Cookies.get();
        for (const cookie in cookies) {
          Cookies.remove(cookie);
        }
      },
    },
  });

  export const { setUserToken, setUserData, handleLogout } = authDataSlice.actions;
  export default authDataSlice.reducer;