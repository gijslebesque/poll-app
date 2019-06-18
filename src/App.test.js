import React from "react";
import App from "./App";
import { Router, MemoryRouter } from "react-router-dom";
import { shallow, mount, render } from "enzyme";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import PollAdmin from "./components/PollAdmin";
import PollQuestion from "./components/PollQuestion";

import history from "./history";

describe("Router", () => {
	it("Router should render correctly", () => {
		const component = render(<Router history={history} />);
		expect(component).toMatchSnapshot();
	});

	it("App should render correctly", () => {
		const component = shallow(<App />);
		expect(component).toMatchSnapshot();
	});

	it("Home should render correctly", () => {
		const component = mount(
			<MemoryRouter initialEntries={["/"]}>
				<App />
			</MemoryRouter>
		);

		expect(component.find(Home)).toHaveLength(1);
		expect(component.find(PollAdmin)).toHaveLength(0);
		expect(component.find(PollQuestion)).toHaveLength(0);
		expect(component.find(NotFound)).toHaveLength(0);
	});

	it("PollQuestion should redirect to home correctly", () => {
		const component = mount(
			<MemoryRouter initialEntries={["/poll/0"]}>
				<App />
			</MemoryRouter>
		);
		expect(component.find(Home)).toHaveLength(1);
		expect(component.find(PollAdmin)).toHaveLength(0);
		expect(component.find(PollQuestion)).toHaveLength(0);
		expect(component.find(NotFound)).toHaveLength(0);
	});

	it("NotFound should render correctly", () => {
		const component = mount(
			<MemoryRouter initialEntries={["/random"]}>
				<App />
			</MemoryRouter>
		);

		expect(component.find(Home)).toHaveLength(0);
		expect(component.find(PollAdmin)).toHaveLength(0);
		expect(component.find(PollQuestion)).toHaveLength(0);
		expect(component.find(NotFound)).toHaveLength(1);
	});
});
