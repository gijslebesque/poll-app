import React from "react";
import { render, mount } from "enzyme";
import PollQuestion from "./PollQuestion";
import history from "../history";
import Section from "./Section";
import Form from "./Form";

let signUpFor = jest.fn();

describe("PollQuestion", () => {
	const pollProps = {
		polls: [],
		match: {
			params: {
				id: 0
			}
		},
		history: history
	};

	const sectionProps = {
		title: "",
		subttitle: ""
	};

	it("PollQuestion should render correctly", () => {
		const component = render(<PollQuestion {...pollProps} />);

		expect(component).toMatchSnapshot();
	});

	it("Vote button click", () => {
		const component = mount(
			<PollQuestion {...pollProps}>
				<Section {...sectionProps}>
					<Form />
				</Section>
			</PollQuestion>
		);
		component
			.find("input[type='radio']")
			.first()
			.simulate("click");

		component.find("#vote").simulate("click");
		console.log(component.state());
	});
});
