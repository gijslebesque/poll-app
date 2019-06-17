import React, { Component } from "react";
import PropTypes from "prop-types";
import Form from "./Form.jsx";
import Section from "./Section";
import Notification from "./Notification";

class PollAdmin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
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

	isEdit = () => {
		const id = this.props.match.params.id;
		if (id) {
			const poll = this.props.getPoll(id);
			if (
				poll[0] &&
				(poll[0].owner === this.props.userName || poll[0].owner === "Anonymous")
			)
				this.setState({ poll: poll[0], edit: true });
		}
	};

	componentDidMount() {
		setTimeout(this.mountStyle, 10);
		this.isEdit();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.userName !== this.props.userName) {
			this.isEdit();
		}
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

		for (let i = answers.length - 1; i > 0; i--) {
			if (!answers[i].value) {
				this.showNotAllowed();
				return;
			}
		}

		if (this.state.poll.answers.length < 2 || !this.state.poll.question) {
			this.showNotAllowed();
		} else {
			const id = this.props.match.params.id;
			this.props.addPoll(this.state.poll, id);
		}
	};
	render() {
		const copy = this.state.edit ? "Edit" : "Add";

		const disabled =
			this.state.poll.answers.length >= 10 ? { disabled: "disabled" } : "";
		return (
			<>
				<Section
					style={this.state.style}
					title={`${copy} your poll`}
					subtitle="Enter a question and add up to 10 possible answers."
				>
					<h3>Question</h3>
					<Form>
						<input
							tabIndex="1"
							className="input"
							type="text"
							placeholder="What do you want to poll?"
							name="question"
							value={this.state.poll.question}
							onChange={e => this.handleQuestion(e)}
						/>
					</Form>
					<h3>Answers</h3>
					{this.state.poll.answers.map((input, i) => (
						<Form key={i}>
							<div className="flex-container" key={i}>
								<input
									tabIndex={i + 2}
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

					<button
						className="button is-outlined is-primary"
						onClick={this.addQuestion}
						{...disabled}
					>
						Add an answer
					</button>

					<button className="button is-primary" onClick={this.addPoll}>
						{`${copy} your poll`}
					</button>

					{this.state.edit && (
						<button
							className="button is-primary"
							onClick={() => this.props.deletePoll(this.props.match.params.id)}
						>
							Delete this poll
						</button>
					)}

					<p>{this.state.poll.answers.length}/10 possible answers.</p>
					{!this.props.userName && (
						<Notification
							type="is-warning"
							text="You are currently not logged in. You can still create a poll, but it can be edited by anyone. Please login to make it personal."
						/>
					)}

					{this.state.notAllowedNotification && (
						<Notification
							type="is-danger"
							text="You need to add at least two answers. And a question."
						/>
					)}
				</Section>
			</>
		);
	}
}

PollAdmin.propTypes = {
	getPoll: PropTypes.func.isRequired,
	addPoll: PropTypes.func.isRequired,
	deletePoll: PropTypes.func.isRequired,
	userName: PropTypes.string.isRequired
};

export default PollAdmin;
