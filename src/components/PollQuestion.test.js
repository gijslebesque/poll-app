import React from "react";
import { render, simulate } from "enzyme";
import PollQuestion from "./PollQuestion";
import history from "../history";

describe("PollQuestion", () => {
	it("PollQuestion should render correctly", () => {
		const baseProps = {
			polls: [],
			match: {
				params: {
					id: 0
				}
			},
			history: history
		};

		const component = render(<PollQuestion {...baseProps} />);
		expect(component.find(".is-primary")).to.have.lengthOf(1);
		//component.find(".button").simulate("click");

		expect(component).toMatchSnapshot();
	});
});
