import React from 'react';
import {getStoreForAnonymousUser} from "../../../__testshared/shared/store/mock-store-service";
import Register from "../../auth/Register";
import {initMockAxios, resetMockAxios} from "../../../__testshared/shared/frameworks/mock-http";
import {mountComponentWithStoreAndHistory} from "../../../__testshared/shared/component-helper";
import {
    setupMocksForRegisterDoctor,
    setupMocksForRegisterTester,
    setupMocksForRegisterUser,
    setupMocksForRegisterUserAPIDown
} from "../../../__testshared/shared/api/mock-auth";
import {appNotification} from "../../shared/notification/app-notification";


describe('Register User tests', () => {

    beforeEach(() => {
        initMockAxios();

    });

    afterEach(() => {
        resetMockAxios();
        jest.restoreAllMocks()
    });

    it('Registering User with valid data should go to profile', async () => {


        const mountedComponent = mountComponentWithStoreAndHistory(<Register/>, getStoreForAnonymousUser())

        const name ="myuser"
        setupMocksForRegisterUser(name)


        mountedComponent.setValue('[name="userRole"]', 'USER')

        const container = mountedComponent.getContainer()


        mountedComponent.setInputValue('[name="firstName"]', name)
        mountedComponent.setFormControlChecked('[id="agreecondition"]')





        await mountedComponent.submitForm("form")

        await mountedComponent.reload();
        mountedComponent.expectLocationToBe("/profile")

    });
    it('Registering User without agreeing terms should throw error', async () => {
        const showErrorSpy=  jest.spyOn(appNotification, 'showError')

        const mountedComponent = mountComponentWithStoreAndHistory(<Register/>, getStoreForAnonymousUser())
        const name ="myuser"
        mountedComponent.setValue('[name="userRole"]', 'USER')
        mountedComponent.setInputValue('[name="firstName"]', name)
        await mountedComponent.submitForm("form")
        await mountedComponent.reload();


        mountedComponent.verifyOnComplete(()=>{
            expect(showErrorSpy).toHaveBeenCalledWith("Please agree the terms and conditions")

        })

    });

    it('Registering User with incorrect confirm password should throw error', async () => {
        const showErrorSpy=  jest.spyOn(appNotification, 'showError')

        const mountedComponent = mountComponentWithStoreAndHistory(<Register/>, getStoreForAnonymousUser())

        const name ="myuser"
        setupMocksForRegisterUser(name)


        mountedComponent.setValue('[name="userRole"]', 'USER')
        mountedComponent.setInputValue('[name="firstName"]', name)
        mountedComponent.setFormControlChecked('[id="agreecondition"]')
        mountedComponent.setInputValue('[name="password"]', "halo")
        mountedComponent.setInputValue('[name="confirmPassword"]', "assword")

        mountedComponent.setFormControlChecked('[label="Patient"]')

        await mountedComponent.submitForm("form")

        await mountedComponent.reload();


        mountedComponent.verifyOnComplete(()=>{
            expect(showErrorSpy).toHaveBeenCalledWith("Passwords Mismatch")

        })

    });

    it('Registering User when server down should throw error', async () => {
        const showErrorSpy=  jest.spyOn(appNotification, 'showError')

        const mountedComponent = mountComponentWithStoreAndHistory(<Register/>, getStoreForAnonymousUser())

        const name ="myuser"
        setupMocksForRegisterUserAPIDown(name)
        mountedComponent.setFormControlChecked('[id="agreecondition"]')
        await mountedComponent.submitForm("form")

        await mountedComponent.reload();


        mountedComponent.verifyOnComplete(()=>{

            expect(showErrorSpy).toBeCalledWith("Server Error")


            //console.log(showErrorSpy.mock.calls[0][0])

        })

    });

});


describe('Register Doctor/Tester tests', () => {


    beforeAll(()=>{






    })
    beforeEach(() => {
        initMockAxios();

    });

    afterEach(() => {

        resetMockAxios();
        jest.restoreAllMocks()
    });

    it('Registering Doctor with valid data should go to upload page', async () => {


        const mountedComponent = mountComponentWithStoreAndHistory(<Register/>, getStoreForAnonymousUser())

        const name ="mydoctor"
        setupMocksForRegisterDoctor(name)

        const container = mountedComponent.getContainer();

          mountedComponent.setFormControlChecked('[label="Doctor"]')


        container.update()

        mountedComponent.setInputValue('[name="firstName"]', name)

        mountedComponent.setFormControlChecked('[id="agreecondition"]')

        mountedComponent.setValue('[id="outlined-gender-native-simple"]', "OTHER")

        await mountedComponent.submitForm("form")

        await mountedComponent.reload();
        mountedComponent.expectLocationContains("/upload-document/DOCTOR" )

    });
    it('Registering Tester with valid data should go to upload page', async () => {


        const mountedComponent = mountComponentWithStoreAndHistory(<Register/>, getStoreForAnonymousUser())

        const name ="mytester"
        setupMocksForRegisterTester(name)

        const container = mountedComponent.getContainer();


        mountedComponent.setFormControlChecked('[label="Tester"]')

        container.update()

        mountedComponent.setInputValue('[name="firstName"]', name)
        mountedComponent.setInputValue('[name="lastName"]', "somelast")
        mountedComponent.setInputValue('[name="userName"]', name)
        mountedComponent.setInputValue('[name="email"]', name+"@upgrad.com")
        mountedComponent.setInputValue('[name="mobile"]', "89437846723")
        mountedComponent.setInputValue('[name="address"]', "some where n world")
        mountedComponent.setInputValue('[name="pinCode"]', "487125")

        mountedComponent.setInputValue('[name="dateOfBirth"]', '1982-11-21')

        mountedComponent.setFormControlChecked('[id="agreecondition"]')

        mountedComponent.setValue('[id="outlined-gender-native-simple"]', "MALE")

        await mountedComponent.submitForm("form")

        await mountedComponent.reload();
        mountedComponent.expectLocationContains("/upload-document/TESTER" )

    });

});
