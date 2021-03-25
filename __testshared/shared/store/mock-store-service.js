import configureStore from "redux-mock-store";
import React from "react";
import {getApplicableRoles} from "../../../src/auth/authStore";
import {getEmptyAuthorityStore, getLoadedAuthorityStore} from "../data/authority-store-responses";


const notLoggedinAuth = {
    "user": null,
    "token": null,
    "isLoggedIn": false,
    "roles": {"isUser": false, "isDoctor": false, "isAuthority": false, "isTester": false, "isApproved": false}
}

const loggedInStoreDetails = {
    "user": {
        "id": 1,
        "userName": "user",
        "age": 54,
        "gender": "FEMALE",
        "address": "240/D - Windsor Drive,Bangalore",
        "firstName": "user",
        "email": "user@upgrad.com",
        "lastName": "",
        "phoneNumber": "9629155718",
        "pinCode": 560003,
        "created": "2020-08-21T16:30:49.088Z",
        "updated": "2020-08-21T16:30:49.088Z",
        "role": "USER",
        "status":"APPROVED"
    },
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwic2NvcGVzIjoiUk9MRV9VU0VSIiwiaWF0IjoxNTk4NDQ0MTYxLCJleHAiOjE1OTg0ODczNjF9.YaWYfNHFC3jqx_dyyPdDrdivFx9OPHK7P1d6lGGq3Mc",
    "isLoggedIn": true,
    "roles": {"isUser": true, "isDoctor": false, "isAuthority": false, "isTester": false, "isApproved": true}
}


export const getUserWith = (name,role)=>{
    const  userDetails = loggedInStoreDetails;
    userDetails.user.userName=name;
    userDetails.user.role=role;
    userDetails.user.roles  =getApplicableRoles(userDetails.user)
    return userDetails;

}


export function getStoreForLoggedInUser() {
    const mockStore = configureStore([]);
    return mockStore({auth: getUserWith("user","USER")});
}
export function getStoreForLoggedInTester() {
    const mockStore = configureStore([]);
    return mockStore({auth: getUserWith("tester","TESTER")});
}
export function getStoreForLoggedInDoctor() {
    const mockStore = configureStore([]);
    return mockStore({auth: getUserWith("doctor","DOCTOR")});
}
export function getStoreForGovernmentAuthority() {
    const mockStore = configureStore([]);
    return mockStore({auth: getUserWith("authority","GOVERNMENT_AUTHORITY"),authority: getEmptyAuthorityStore()});
}
export function getStoreForGovernmentAuthorityWithPendingUsersAndThresholds() {
    const mockStore = configureStore([]);
    return mockStore({auth: getUserWith("authority","GOVERNMENT_AUTHORITY"),authority: getLoadedAuthorityStore()});
}

export function getStoreForAnonymousUser() {
    const mockStore = configureStore([]);
    return mockStore({auth: notLoggedinAuth});
}

