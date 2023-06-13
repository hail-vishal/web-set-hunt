import { createSlice} from "@reduxjs/toolkit";

export const questions = createSlice({
    name:'questions',
    initialState:null,
    reducers:{
        UPDATE_QUESTION:(state,action)=>{
            return action.payload
        }
    }
});

export const {UPDATE_QUESTION} = questions.actions;

export default questions.reducer;