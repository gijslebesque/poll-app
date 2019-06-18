import React from "react";
import Form from "../Form";
import Home from "../Home";
import Menu from "../Menu";
import Modal from "../Modal";
import NavBar from "../NavBar";
import NotFound from "../NotFound";
import Section from "../Section";

import { render, shallow } from "enzyme";

describe("Representational components", () => {
	it("Form should render correctly", () => {
		const wrapper = render(<Form />);
		expect(wrapper).toMatchSnapshot();
	});

	it("Home should render correctly", () => {
		const wrapper = render(<Home />);
		expect(wrapper).toMatchSnapshot();
	});

	it("Menu should render correctly", () => {
		const wrapper = render(<Menu />);
		expect(wrapper).toMatchSnapshot();
	});

	it("Modal should render correctly", () => {
		const wrapper = render(<Modal />);
		expect(wrapper).toMatchSnapshot();
	});

	it("NavBar should render correctly", () => {
		const baseProps = {
			toggleModal: jest.fn(),
			userName: "",
			logout: jest.fn()
		};
		const wrapper = shallow(<NavBar {...baseProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("NotFound should render correctly", () => {
		const wrapper = render(<NotFound />);
		expect(wrapper).toMatchSnapshot();
	});

	it("Section should render correctly", () => {
		const wrapper = render(<Section />);
		expect(wrapper).toMatchSnapshot();
	});
});
