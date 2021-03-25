import reducer, {
    initialState,
    UPDATE_PENDING_USERDATA,
    UPDATE_THRESHOLD
} from "../../../authority/store/authorityStore";
import {allThresholdsResponse} from "../../../../__testshared/shared/data/threshold-responses";
import {pendingApprovalResponse} from "../../../../__testshared/shared/data/authority-responses";


describe('Authority Reducer Tests', () => {

    function applyActionInStore(inputAction) {
        return reducer(undefined, inputAction)
    }

    beforeEach(()=>{


    })
    it('should return the initial state', () => {
        expect(applyActionInStore({})).toEqual(initialState);
    });



    it('should update ThresholdLevel Data when UPDATE_THRESHOLD called with valid payload', () => {



        const payload = allThresholdsResponse
        const inputAction = {
            type: UPDATE_THRESHOLD,
            payload
        };
        // it's empty on purpose because it's just starting to fetch posts
        const updatedState = reducer({}, inputAction);
        expect(updatedState.thresholds).not.toBe({});
    });


    it('should update pendingUsers Data when updatePendingData called with valid payload', () => {



        const payload = pendingApprovalResponse
        const inputAction = {
            type: UPDATE_PENDING_USERDATA,
            payload
        };
        // it's empty on purpose because it's just starting to fetch posts
        const updatedState = reducer({}, inputAction);
        expect(updatedState.pendingUsers).not.toBe([]);
        expect(updatedState.pendingUserGridData).not.toBe([]);
        expect(updatedState.pendingUsersLoaded).not.toBe(false);

    });


});
