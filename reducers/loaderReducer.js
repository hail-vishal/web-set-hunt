import { createSlice } from "@reduxjs/toolkit";

export const loader = createSlice({
    name:'loader',
    initialState:false,
    reducers:{
        SHOW_LOADER:(state)=>{
            return true
        },
        REMOVE_LOADER:(state)=>{
            return false
        }
    }
});

export const {SHOW_LOADER,REMOVE_LOADER}=loader.actions;
export default loader.reducer;
