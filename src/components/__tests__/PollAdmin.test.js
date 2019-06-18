import React from "react";
import { shallow } from "enzyme";
import PollAdmin from "../PollAdmin";
import history from "../../history";

const getAnswersLength = instance => {
	const {
		state: {
			poll: { answers }
		}
	} = instance;
	return answers.length;
};

describe("PollAdmin", () => {
	let wrapper;
	let instance;

	beforeEach(() => {
		const baseProps = {
			getPoll: jest.fn(),
			addPoll: jest.fn(),
			deletePoll: jest.fn(),
			userName: "",
			match: {
				params: {
					id: 0
				}
			},
			history: history
		};
		wrapper = shallow(<PollAdmin {...baseProps} />);
		instance = wrapper.instance();
	});

	it('should call addAnswer when the "Add an answer" button is clicked', () => {
		const addAnswerButton = wrapper.find("button.add-answer");
		const spyFn = jest.spyOn(instance, "addAnswer");
		addAnswerButton.simulate("click");
		expect(spyFn).toBeCalled();
	});

	it("should add an answer input when the addAnswer method is called", () => {
		const initialNoOfAnswers = getAnswersLength(instance);

		instance.addAnswer();

		const finalNoOfAnswers = getAnswersLength(instance);

		expect(finalNoOfAnswers).toEqual(initialNoOfAnswers + 1);
	});

	it('should call deleteAnswer when the "Delete" button is clicked', () => {
		const deleteAnswerButton = wrapper.find("button.delete-answer").first();
		const spyFn = jest.spyOn(instance, "deleteAnswer");
		deleteAnswerButton.simulate("click");
		expect(spyFn).toBeCalled();
	});

	it("should remove an answer input when the addAnswer method is called", () => {
		const initialNoOfAnswers = getAnswersLength(instance);

		instance.deleteAnswer();

		const finalNoOfAnswers = getAnswersLength(instance);

		expect(finalNoOfAnswers).toEqual(initialNoOfAnswers - 1);
	});
});
