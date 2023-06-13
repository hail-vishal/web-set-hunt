import { createSlice} from "@reduxjs/toolkit";

export const lobby = createSlice({
    name:'lobby',
    initialState:0,
    reducers:{
        UPDATE_LOBBY:(state,action)=>{
            return action.payload
        }
    }
});

export const {UPDATE_LOBBY} = lobby.actions;

export default lobby.reducer;