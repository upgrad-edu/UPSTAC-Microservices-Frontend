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

describe('App Component shallow tests', () => {

    it('should render correctly in "debug" mode', () => {


        const wrapper = mount(<Provider  store={getStoreForLoggedInUser()}>
            <MemoryRouter >
                <App  />
            </MemoryRouter >
        </Provider>);


        expect(wrapper.find(LoadingIndicatorComponent)).toHaveLength(1);
        expect(wrapper.find(Route)).toHaveLength(1);
        console.log(wrapper.find(Route).props().path)
        expect(wrapper.find(Route).props().path).toBe('/profile');


    });
});
