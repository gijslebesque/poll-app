import React from "react";
import { shallow } from "enzyme";
import PollQuestion from "../PollQuestion";
import history from "../../history";

describe("PollQuestion", () => {
	let wrapper;
	let instance;

	beforeEach(() => {
		const baseProps = {
			polls: [],
			userName: "",
			match: {
				params: {
					id: 0
				}
			},
			history: history
		};
		wrapper = shallow(<PollQuestion {...baseProps} />);
		instance = wrapper.instance();
	});

	it("Vote button clicked", () => {
		const voteButton = wrapper.find("button#vote");
		const spyFn = jest.spyOn(instance, "vote");
		voteButton.simulate("click");
		expect(spyFn).toBeCalled();
	});

	it("Reset button clicked", () => {
		const resetButton = wrapper.find("button#reset");
		const spyFn = jest.spyOn(instance, "reset");
		resetButton.simulate("click");
		expect(spyFn).toBeCalled();
	});

	it("If user is not logged in should not show edit button", () => {
		wrapper.setProps({ userName: "" });
		expect(wrapper.find("button#edit").length).toEqual(0);
	});

	it("If user is logged in and owns poll should show edit button", () => {
		wrapper.setProps({ userName: "User" });
		wrapper.setState({ poll: { owner: "User", question: "", answers: [] } });
		const editButton = wrapper.find("button#edit");
		const spyFn = jest.spyOn(instance, "edit");

		expect(editButton.length).toEqual(1);

		editButton.simulate("click");
		expect(spyFn).toBeCalled();
	});
});
