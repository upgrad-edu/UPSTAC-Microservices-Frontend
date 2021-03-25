import {createMemoryHistory} from "history";

//import {Router} from "react-router";
import {Route, Router, Switch} from "react-router-dom";
import React from "react";

import {Provider} from "react-redux";
import {mount, shallow} from 'enzyme';
import {act} from "@testing-library/react";
import UpdateConsultation from "../../src/consultation/UpdateConsultation";


export const flushPromises = () => new Promise(setImmediate);

function createObjectWith({container, currentStore, history}) {
    const mountedComponent = {


        waitForDomLoad: async function () {

            //setState should be followed by this method to Avoid Issues

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
                container.update();
            });
        },

        getContainer: function () {
            return container;
        },
        getStore: function () {
            return currentStore;
        },
        getHistory: function () {
            return history;
        },
        reload: async function () {
            await flushPromises();

            container.update();

        },
        setInputValue: function (querySelector, value) {


            container.find(querySelector).at(0).simulate('input', {target: {value: value}});

        },
        setValueWithChangeTrigger: function (querySelector, value) {

            container.find(querySelector).at(0).simulate('change', {target: {value: value}});


        },
        setValue: function (querySelector, value) {
            act(() => {
                container.find(querySelector).at(0).simulate('input', {target: {value: value}});
                container.find(querySelector).at(0).simulate('change', {target: {value: value}});
                container.update();
            })

        },
        setFileValue: function (querySelector, value) {
            act(() => {

                container.find(querySelector).at(0).simulate('change', {target: {files: [value]}});
                container.update();
            })

        },
        setFormControlChecked: function (querySelector) {


            act(() => {


                let checkbox = container.find(querySelector).first();
                shallow(checkbox.prop('control')).simulate('change', {target: {checked: true}});


                container.update();


            })


        },
        setUnChecked: function (querySelector) {

            container.find(querySelector).at(0).simulate('change', {target: {checked: false}});


        },


        submitForm: async function (querySelector) {
            await this.reload()

            container.find(querySelector).simulate("submit");

        },
        expectLocationToBe: function (url) {
            this.verifyOnComplete(() => {
                expect(history.location.pathname).toBe(url);
            });
        },
        expectLocationContains: function (url) {
            this.verifyOnComplete(() => {
                expect(history.location.pathname).toContain(url)
            });
        },
        verifyOnComplete: function (cb) {
            process.nextTick(() => {
                cb()
            });
        }

    }
    return mountedComponent;
}

export function mountComponentWithStoreAndHistory(element, defaultStore) {

    let history = createMemoryHistory();


    const currentStore = defaultStore;
    let container

    container = mount(<Provider store={currentStore}>
        <Router history={history}>
            {element}
        </Router>
    </Provider>);

    return createObjectWith({container, currentStore, history})


}

export function mountComponentWithStoreAndHistoryAndUrl(element, options) {

    let {store, defaultUrl, routePath} = options

    let history;

    if (defaultUrl) {
        history = createMemoryHistory({
            initialEntries: [defaultUrl],
            initialIndex: 0
        });

    } else {
        routePath = "*"
        history = createMemoryHistory();
    }

    const currentStore = store;
    let container

    container = mount(<Provider store={currentStore}>
        <Router history={history}>
            <Switch>
                <Route path={routePath}>
                    {element}
                </Route></Switch>
        </Router>
    </Provider>);

    return createObjectWith({container, currentStore, history})
}
