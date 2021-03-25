import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "../../config/store";
import {CssBaseline} from "../../component";
import {act} from 'react-dom/test-utils';

let container;



describe('Store   tests', () => {


    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
        container = null;
    });

    it('can render Provider', () => {

        act(() => {
            ReactDOM.render(  <Provider store={store}>

                <CssBaseline  />


            </Provider>, container);
        });


        expect(container.textContent).not.toBeNull();

    });



});

