//import MockAdapter from 'axios-mock-adapter';
import React from "react";
import {initMockAxios, mockAny, mockPost, mockServerError, resetMockAxios} from "../../../__testshared/shared/frameworks/mock-http";
import {environment} from "../../environment";
import {getMockedLoginResponse} from "../../../__testshared/shared/data/auth-responses";
import {doLogin, doLogout, doUploadDocument, getToken} from "../../auth/authDispatcher";
import {getMockedUserDetailsResponseForNormalUser} from "../../../__testshared/shared/data/auth-responses";
import {setupMocksForUploadDocument, setupMocksForValidUserLogin} from "../../../__testshared/shared/api/mock-auth";
import {LOGOUT} from "../../auth/authStore";



describe('Get Token Tests', () => {
    beforeEach(() => {
        initMockAxios();
    });

    afterEach(() => {
        resetMockAxios();
    });
    const authUrl = environment.baseUrl + '/auth/login';

    it('should return token details if correct response is passed', (done ) => {

        mockPost(authUrl,getMockedLoginResponse())
        const loginRequest ={user:"someUser",password:"somePassword"}
            getToken(loginRequest).subscribe(res=>{

                expect(res).not.toBeNull()
                done()
            })


    });

    it('should throw exception for incorrect response ', (done ) => {

        mockServerError(authUrl)
        const loginRequest ={user:"invalidUser",password:"invalidPassword"}
            getToken(loginRequest).subscribe(res=>{

                expect(res).toBeNull()
                done()
            },(error => {

                expect(error).not.toBeNull()
                done()
            }))


    });
});

describe('Upload & Logout Tests', () => {

    beforeEach(() => {
        initMockAxios();
    });

    afterEach(() => {
        resetMockAxios();
    });

    it('should call http upload', (done) => {

        const id=23;
        const files =["SOME-DUMMY_DATA"]
        setupMocksForUploadDocument(id);
        doUploadDocument(id,files).subscribe(res=>{

            done()
        })
    })


    it('should redirect to home page, when logging out', () => {


        const mockDispatch = jest.fn();

        const mockHistory=[]

        doLogout(mockDispatch,mockHistory)

        expect(mockHistory.length).toBe(1)
        expect(mockDispatch).toBeCalledWith({type: LOGOUT})

    })

});

describe('Login Tests', () => {
    beforeEach(() => {
        initMockAxios();
    });

    afterEach(() => {
        resetMockAxios();
    });


    it('should login succesful and retrieve User Details if correct response is passed', (done ) => {
        setupMocksForValidUserLogin();
        const loginRequest ={user:"someUser",password:"somePassword"}
        doLogin(loginRequest).subscribe(res=>{

                expect(res).not.toBeNull()
                expect(res.token).not.toBeNull()
                expect(res.user).not.toBeNull()
                done()
            })


    });

});


