import React from 'react';
import App from '../App';
import {MemoryRouter, Route} from "react-router-dom";
//on Not Logging in Default route is redirected to login
//on  Logging in Default route is redirected to profile
//on  Logging in Http Token is set
import LoadingIndicatorComponent from "../shared/loader/loading-indicator-component";

import TestRenderer from "react-test-renderer";
import { getStoreForLoggedInUser, getStoreForAnonymousUser} from "../../__testshared/shared/store/mock-store-service";
import {createMemoryHistory} from "history";
import {Provider} from "react-redux";
import { shallow,mount } from 'enzyme';
describe('App Component Tests with renderer', () => {
    let testRenderer;

    beforeEach(() => {

    });
    afterEach(() => {

    });

    it('When user is logged in The default route should be /profile', () => {


        testRenderer =   createTestComponentWith(<App />,getStoreForLoggedInUser()) ;


        expectDefaultRouteIs(testRenderer, "/profile");

    });

    it('When user is not logged in The default route should be /login', () => {


        testRenderer =   createTestComponentWith(<App />,getStoreForAnonymousUser()) ;


        expectDefaultRouteIs(testRenderer, "/login");

    });





});



function expectDefaultRouteIs(testRenderer, url) {
    const testInstance = testRenderer.root;
    expect(testInstance.findByType(LoadingIndicatorComponent)).not.toBeNull();
    let instance = testInstance.findByType(Route);
    expect(instance).not.toBeNull();
    expect(instance.props.path).toBe(url);
}

function createTestComponentWith(component,store) {
    const history = createMemoryHistory();
    return   TestRenderer.create(<Provider store={store}>
        <MemoryRouter >
            {component}
        </MemoryRouter >
    </Provider>);
}
