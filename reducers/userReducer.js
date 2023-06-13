// const INITIAL_STATE = null;

// function authenticationReducer(state = INITIAL_STATE, action) {
// 	switch (action.type) {
// 		case 'SIGN_IN':
// 			return action.payload;
// 		case 'SIGN_OUT':
// 			return null;
// 		case 'UPDATE_USER':
// 			return action.payload;
//         case 'ADD_TEAM_DATA':
// 			const {teamName,teamId}=action.payload;
// 			state['teamName']=teamName;
// 			state['teamId']=teamId;
// 			console.log(state);
// 			return state;
// 		default:
// 			return state;
// 	}
// }

// export default authenticationReducer;
import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
    name:'user',
    initialState:null,
    reducers:{
        UPDATE_USER:(state,action)=>{
            return action.payload;
        },
        ADD_TEAM_DATA:(state,action)=>{
            const {teamName,teamId}=action.payload;
			state['teamName']=teamName;
			state['teamId']=teamId;
			return state;
        }
    }
});

export const {UPDATE_USER,ADD_TEAM_DATA}=user.actions;
export default user.reducer;
