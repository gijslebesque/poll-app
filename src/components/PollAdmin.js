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

		this.isEdit = this.isEdit.bind(this);
		this.mountStyle = this.mountStyle.bind(this);
		this.unMountStyle = this.unMountStyle.bind(this);
		this.handleQuestion = this.handleQuestion.bind(this);
		this.changeQuestion = this.changeQuestion.bind(this);
		this.addAnswer = this.addAnswer.bind(this);
		this.deleteAnswer = this.deleteAnswer.bind(this);
		this.showNotAllowed = this.showNotAllowed.bind(this);
		this.addPoll = this.addPoll.bind(this);
	}

	componentDidMount() {
		setTimeout(this.mountStyle, 10);
		this.isEdit();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.userName !== this.props.userName) {
			this.isEdit();
		}
	}

	isEdit() {
		const id = this.props.match.params.id;
		if (id) {
			const poll = this.props.getPoll(id);
			if (
				poll[0] &&
				(poll[0].owner === this.props.userName || poll[0].owner === "Anonymous")
			)
				this.setState({ poll: poll[0], edit: true });
		}
	}

	mountStyle() {
		// css for mounting animation
		this.setState({
			style: {
				transform: "translate(0%)",
				transition: "all 0.5s ease"
			}
		});
	}

	unMountStyle() {
		// css for unmounting animation
		this.setState({
			style: {
				transform: "translate(-100%)",
				opacity: 1,
				transition: "all 0.5s ease"
			}
		});
	}

	handleQuestion(e) {
		const poll = { ...this.state.poll };
		poll.question = e.target.value;
		this.setState({ poll });
	}

	changeQuestion(e, i) {
		e.preventDefault();
		const answers = [...this.state.poll.answers];
		answers[i].value = e.target.value;

		this.setState(prevState => ({
			poll: {
				...prevState.poll,
				answers: answers
			}
		}));
	}

	addAnswer() {
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
	}

	deleteAnswer(i) {
		const answers = [...this.state.poll.answers];
		answers.splice(i, 1);
		this.setState(prevState => ({ poll: { ...prevState.poll, answers } }));
	}

	showNotAllowed() {
		if (this.state.notAllowedNotification) return;
		this.setState({ notAllowedNotification: true });
		setTimeout(() => this.setState({ notAllowedNotification: false }), 3000);
	}

	addPoll() {
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
	}

	render() {
		const copy = this.state.edit ? "Edit" : "Add";

		const disabled =
			this.state.poll.answers.length >= 10 ? { disabled: "disabled" } : "";

		return (
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
								className="button is-link delete-answer"
								onClick={() => this.deleteAnswer(i)}
							>
								Delete
							</button>
						</div>
					</Form>
				))}

				<button
					className="button is-outlined is-primary add-answer"
					onClick={() => this.addAnswer()}
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
