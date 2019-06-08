import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import Form from "../Form.jsx";
import Section from "../Section";
import Notification from "../Notification";
const notificationRoot = document.getElementById("notification-root");

class PollAdmin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			style: {
				transform: "translate(100%)",
				transition: "all 1s ease"
			},
			poll: {
				question: "",
				answers: [
					{
						name: 0,
						value: ""
					},
					{
						name: 0,
						value: ""
					}
				]
			},
			notAllowedNotification: false
		};
	}

	componentDidMount() {
		setTimeout(this.mountStyle, 10);
	}

	clickNextHandler = e => {
		this.unMountStyle();
		setTimeout(() => {
			this.props.clickNextHandler(e);
		}, 200);
	};

	mountStyle = () => {
		this.setState({
			style: {
				transform: "translate(0%)",
				transition: "all 0.5s ease"
			}
		});
	};

	unMountStyle = () => {
		// css for mount animation
		this.setState({
			style: {
				transform: "translate(-100%)",
				opacity: 1,
				transition: "all 0.5s ease"
			}
		});
	};

	handleQuestion = e => {
		const poll = { ...this.state.poll };
		poll.question = e.target.value;
		this.setState({ poll });
	};

	addQuestion = () => {
		if (this.state.poll.answers.length >= 10) return;
		const newInput = {
			name: this.state.poll.answers.length,
			value: ""
		};
		this.setState(prevState => ({
			poll: {
				...prevState.poll,
				answers: prevState.poll.answers.concat([newInput])
			}
		}));
	};

	changeQuestion = (e, i) => {
		e.preventDefault();
		const answers = [...this.state.poll.answers];
		answers[i].value = e.target.value;

		this.setState(prevState => ({
			poll: {
				...prevState.poll,
				answers: answers
			}
		}));
	};

	deleteInput = i => {
		const answers = [...this.state.poll.answers];
		answers.splice(i, 1);
		this.setState(prevState => ({ poll: { ...prevState.poll, answers } }));
	};

	showNotAllowed = () => {
		if (this.state.notAllowedNotification) return;
		this.setState({ notAllowedNotification: true });
		setTimeout(() => this.setState({ notAllowedNotification: false }), 3000);
	};

	addPoll = () => {
		const answers = this.state.poll.answers;
		debugger;

		for (let i = answers.length - 1; i > 0; i--) {
			if (!answers[i].value) {
				debugger;
				this.showNotAllowed();

				return;
			}
		}

		if (this.state.poll.answers.length < 2 || !this.state.poll.question) {
			this.showNotAllowed();
		} else {
			this.props.addPoll(this.state.poll);
		}
	};
	render() {
		const disabled =
			this.state.poll.answers.length >= 10 ? { disabled: "disabled" } : "";
		return (
			<Section
				style={this.state.style}
				title="Create your poll"
				subtitle="Fill in a question and add up to 10 possible answers to it."
			>
				<h3>Question</h3>
				<Form>
					<input
						className="input"
						type="text"
						placeholder="What do you want to poll?"
						name="question"
						onChange={e => this.handleQuestion(e)}
					/>
				</Form>
				<h3>Answers</h3>
				{this.state.poll.answers.map((input, i) => (
					<Form>
						<div className="flex-container" key={i}>
							<input
								className="input"
								type="text"
								placeholder="Provide an answer"
								name={input.name}
								value={input.value}
								onChange={e => {
									this.changeQuestion(e, i);
								}}
							/>
							<button
								className="button is-link"
								onClick={() => this.deleteInput(i)}
							>
								Delete
							</button>
						</div>
					</Form>
				))}

				<button className="button" onClick={this.addQuestion} {...disabled}>
					Add an answer
				</button>

				<button className="button" onClick={this.addPoll}>
					Add your poll
				</button>
				{!this.props.userName &&
					createPortal(
						<Notification
							type="is-warning"
							text="You are currently not logged in. You can still create a poll, but it can be edited by anyone. Please login to make it personal."
						/>,
						notificationRoot
					)}

				{this.state.notAllowedNotification &&
					createPortal(
						<Notification
							type="is-danger"
							text="You need to add at least two answers. And a question."
						/>,
						notificationRoot
					)}
			</Section>
		);
	}
}

PollAdmin.propTypes = {
	clickNextHandler: PropTypes.func.isRequired,
	handleQuestion: PropTypes.func.isRequired,
	answers: PropTypes.array.isRequired,
	changeQuestion: PropTypes.func.isRequired,
	deleteInput: PropTypes.func.isRequired,
	addQuestion: PropTypes.func.isRequired
};

export default PollAdmin;
