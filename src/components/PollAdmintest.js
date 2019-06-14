import React from "react";
import { shallow, mount, render } from "enzyme";
import { Router } from "react-router-dom";
import PollAdmin from "./PollAdmin";
import history from "../history";

describe("PollAdmin", () => {
	it("Router should render correctly", () => {
		const baseProps = {
			getPoll: jest.fn(),
			addPoll: jest.fn(),
			userName: ""
		};
		const component = shallow(<PollAdmin {...baseProps} />);

		const wrapper = shallow(<Router history={history}>component</Router>, {
			attachTo: document.body
		});
		expect(component.find(".clicks-0").length).to.equal(1);

		expect(wrapper).toMatchSnapshot();
	});
});
