import React from "react";
import {getNameAndInitials} from "../../shared/common-helpers";

describe('Common helper tests', () => {

    function verify(firstName, lastName, expectedInitials, expectedName) {
        let {initials, name} = getNameAndInitials(firstName, lastName);

        expect(initials).toBe(expectedInitials)

        expect(name).toBe(expectedName)
    }

    it('should retrieve JB for Jamesbond ', () => {


        verify("james", "bond", "JB", "james bond");
        verify("james", "", "J", "james");
        verify("james", null, "J", "james");
        verify(null,"james",  "J", "james");
        verify(null, null, "UN", "");


    });

});
