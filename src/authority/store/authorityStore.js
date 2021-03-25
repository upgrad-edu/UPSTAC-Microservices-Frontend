import {createReducer} from "../../config/create-reducer";

export const UPDATE_THRESHOLD = "authority/updateThreshold";
export const UPDATE_PENDING_USERDATA = "authority/updatePendingApprovals";


export const initialState = {

    thresholds:{},
    pendingUsers:[],
    pendingUserGridData:[],
    pendingUsersLoaded:false,
}

function transformPendingUsersForGrid(pendingUsers){
   return pendingUsers.map(item => {

        return [item.firstName, item.email, item.role]
    })

}





const updateThresholdLevel =(state,action)=>{


    return { ...state,thresholds:action.payload}

};
const updatePendingData =(state,action)=>{


    console.log("updatePendingData");
    const pendingUsers = action.payload;

    return { ...state,pendingUsersLoaded:true,pendingUsers,pendingUserGridData:transformPendingUsersForGrid(pendingUsers)}

};



const authorityReducer = createReducer(initialState, {
    [UPDATE_THRESHOLD]: updateThresholdLevel,
    [UPDATE_PENDING_USERDATA]: updatePendingData,



});


export default authorityReducer;

