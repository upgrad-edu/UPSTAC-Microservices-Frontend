//import MockAdapter from 'axios-mock-adapter';
import React from "react";
import {getMockedUserDetailsResponseForNormalUser} from "../../../__testshared/shared/data/auth-responses";


import reducer, {initialState, LOGIN, LOGOUT} from '../../auth/authStore';
import {getAsUser} from "../../auth/user";
import {REHYDRATE} from "redux-persist";



describe('Auth Reducer Tests', () => {

    function applyActionInStore(inputAction) {
        return reducer(undefined, inputAction)
    }

    beforeEach(()=>{


    })
    it('should return the initial state', () => {
        expect(applyActionInStore({})).toEqual(initialState);
    });

    it('should return initialState when LOGIN called with empty payload', () => {
        const inputAction = {
            type: LOGIN
        };
        // it's empty on purpose because it's just starting to fetch posts
        expect(applyActionInStore(inputAction)).toEqual(initialState);
    });
    it('should return initialState when LOGOUT', () => {
        const inputAction = {
            type: LOGOUT
        };
        // it's empty on purpose because it's just starting to fetch posts
        expect(applyActionInStore(inputAction)).toEqual(initialState);
    });
    it('should return to initialState when REHYDRATE called with no payload', () => {
        const inputAction = {
            type: REHYDRATE
        };
        // it's empty on purpose because it's just starting to fetch posts
        expect(applyActionInStore(inputAction)).toEqual(initialState);
    });

    it('should update auth data when REHYDRATE called with payload', () => {



        const payload = {}
        payload.auth={}
        const token = "sometoken";
        payload.auth.token = token;
        payload.auth.user = getAsUser(getMockedUserDetailsResponseForNormalUser());

        const inputAction = {
            type: REHYDRATE,
            payload
        };
        const updatedState = reducer({}, inputAction);
        expect(updatedState.isLoggedIn).toBe(true);
        expect(updatedState.token).toBe(token);


    });


    it('should update Login Data when LOGIN called with valid payload', () => {



        const payload = {}
        payload.token = "sometoken";
        payload.user = getAsUser(getMockedUserDetailsResponseForNormalUser());

        const inputAction = {
            type: LOGIN,
            payload
        };
        // it's empty on purpose because it's just starting to fetch posts
        const updatedState = reducer({}, inputAction);
        expect(updatedState.isLoggedIn).toBe(true);
        expect(updatedState.token).not.toBeNull();
    });


});

