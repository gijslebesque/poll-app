import React, { Component } from "react";
import PropTypes from "prop-types";
import Form from "../Form.jsx";
import Section from "../Section";
import Notification from "../Notification";

class PollAdmin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			style: {
				transform: "translate(-100%)",
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
			}
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
		console.log(e.target.value);
		debugger;
		const poll = { ...this.state.poll };
		poll.question = e.target.value;
		this.setState({ poll });
		// this.setState(prevState => ({
		// 	poll: { ...prevState.poll, question: e.target.value }
		// }));
	};

	addQuestion = e => {
		if (this.state.poll.answers.length >= 10) return false;
		e.preventDefault();
		var newInput = {
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

	deleteInput = (e, i) => {
		e.preventDefault();
		if (this.state.answers.length <= 2) return false;
		const answers = [...this.state.answers];
		answers.splice(i, 1);
		this.setState({ answers });
	};

	render() {
		return (
			<Section
				style={this.state.style}
				title="Create your poll"
				subtitle="Fill in a question and add up to 10 possible answers to it."
			>
				<Form>
					<input
						className="input"
						type="text"
						placeholder="What do you want to poll?"
						name="question"
						onChange={e => this.handleQuestion(e)}
					/>
				</Form>

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
								onClick={e => this.deleteInput(e, i)}
							>
								Delete
							</button>
						</div>
					</Form>
				))}

				<button className="button" onClick={e => this.addQuestion(e)}>
					Add an answer
				</button>
				<button
					className="button"
					onClick={e => this.props.addPoll(this.state.poll)}
				>
					Add your poll
				</button>
				<Notification type="is-warning" />
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
