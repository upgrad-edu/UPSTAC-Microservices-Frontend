import {environment} from "../../../src/environment";
import {mockAny, mockPost, mockServerError} from "../frameworks/mock-http";
import {
    getMockedLoginResponse, getMockedRegisterDoctorResponse, getMockedRegisterTesterResponse,
    getMockedRegisterUserResponse,
    getMockedUserDetailsResponseForNormalUser
} from "../data/auth-responses";

const loginUrl = environment.baseUrl + '/auth/login';
export function setupMocksForValidUserLogin() {
    const userDetailsUrl = environment.baseUrl + '/users/details';
    mockPost(loginUrl, getMockedLoginResponse())
    mockAny(userDetailsUrl, getMockedUserDetailsResponseForNormalUser())
}


export function setupMocksForUploadDocument(id) {

    const url = environment.baseUrl + '/documents/upload/' +id;

    mockAny(url, {status:"Success"})
}

export function setupMockErrorForUploadDocument(id) {

    const url = environment.baseUrl + '/documents/upload/' +id;

    mockServerError(url)
}

export function setupMocksForRegisterUser(name) {
    setupMocksForValidUserLogin();
    const url = environment.baseUrl + '/auth/register';
    mockPost(url, getMockedRegisterUserResponse(name))

}
export function setupMocksForRegisterUserAPIDown() {

    const url = environment.baseUrl + '/auth/register';
    mockServerError(url)

}

export function setupMocksForRegisterDoctor(name) {

    const url = environment.baseUrl + '/auth/doctor/register';
    mockPost(url, getMockedRegisterDoctorResponse(name))

}export function setupMocksForRegisterTester(name) {

    const url = environment.baseUrl + '/auth/tester/register';
    mockPost(url, getMockedRegisterTesterResponse(name))

}
export function setupMocksForInValidUser() {
    mockServerError(loginUrl)
}
