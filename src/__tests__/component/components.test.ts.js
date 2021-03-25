import {mount} from "enzyme";
import React from "react";
import Forbidden from "../../component/Forbidden";
import Container from "@material-ui/core/Container";
import {LoadingView} from "../../component/LoadingView";


describe('Components render tests', () => {

    it('should render Forbidden ', () => {


        const wrapper = mount(<Forbidden></Forbidden>);


        expect(wrapper.find("h1")).toHaveLength(1);



    });
    it('should render Loading view ', () => {


        const wrapper = mount(<LoadingView></LoadingView>);


        expect(wrapper.find("div")).toHaveLength(1);



    });
});
