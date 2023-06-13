import { createSlice } from "@reduxjs/toolkit";

export const team = createSlice({
    name:'team',
    initialState:null,
    reducers:{
        UPDATE_TEAM: (state,action)=>{
            return action.payload
        },
       
    }
});

export const {UPDATE_TEAM}=team.actions;
export default team.reducer;