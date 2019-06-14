import React, { Component } from "react";
import PollAnswers from "./PollChart";
import PropTypes from "prop-types";
import Section from "./Section";
import Form from "./Form.jsx";

class PollQuestions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: "",
			showEditModal: false,
			userAnswers: [],
			style: {
				transform: "translate(100%)"
			},
			poll: {
				question: "",
				answers: []
			}
		};
	}
	componentDidMount() {
		// call the animation
		this.showPoll();
		setTimeout(this.mountStyle, 10);
	}

	componentDidUpdate(prevProps) {
		const {
			match: {
				params: { id }
			}
		} = this.props;

		if (prevProps.match.params.id !== id) {
			this.showPoll();
		}
	}

	mountStyle = () => {
		// css for mount animation
		this.setState({
			style: {
				transform: "translate(0%)",
				transition: "all 0.5s ease"
			}
		});
	};
	unMountStyle = () => {
		// css for unmount animation
		this.setState({
			style: {
				transform: "translate(100%)",
				transition: "all 0.5s ease"
			}
		});
	};

	vote = () => {
		const updatedUserAnswers = this.state.userAnswers.map((answer, i) => {
			if (i === this.state.checked) {
				answer.vote++;
			}
			return answer;
		});
		this.setState({ userAnswers: updatedUserAnswers, checked: "" });
	};
	reset = () => {
		this.showPoll();
	};
	edit = () => {
		this.props.history.push({
			pathname: `/create-poll/${this.props.match.params.id}`,
			poll: this.state.poll
		});
	};
	showPoll = () => {
		const id = this.props.match.params.id;
		const polls = this.props.polls;

		const poll = polls.filter((poll, i) => {
			return i === parseInt(id);
		});

		if (!poll[0]) {
			this.props.history.push("/");
			return;
		}
		const userAnswers = poll[0].answers.map((answer, i) => {
			return {
				name: `Answer ${i + 1}`,
				vote: 0
			};
		});

		this.setState({ poll: poll[0], userAnswers });
	};
	handleRadioBtn = e => {
		const indexBtn = parseInt(e.target.getAttribute("data-index"));
		this.setState({ checked: indexBtn });
	};

	render() {
		const { poll } = this.state;
		return (
			<div style={this.state.style}>
				<Section title={poll.question} subtitle={`asked by ${poll.owner}`}>
					<div className="columns">
						<div className="column">
							<Form name="Answers">
								{poll.answers.map((answer, i) => {
									return (
										<div className="control" key={i}>
											<label className="radio">
												<input
													type="radio"
													name="answer"
													checked={this.state.checked === i}
													data-index={i}
													value={answer.value}
													onChange={e => this.handleRadioBtn(e)}
												/>
												{answer.value}
											</label>
										</div>
									);
								})}
								<button className="button is-primary" onClick={this.vote}>
									Vote!
								</button>
								<button className="button is-primary" onClick={this.reset}>
									Reset
								</button>
								{(this.state.poll.owner === this.props.userName ||
									this.state.poll.owner === "Anonymous") && (
									<button className="button is-primary" onClick={this.edit}>
										edit
									</button>
								)}
							</Form>
						</div>
						<div className="column">
							<PollAnswers userAnswers={this.state.userAnswers} />
						</div>
					</div>
				</Section>
			</div>
		);
	}
}

PollQuestions.propTypes = {
	polls: PropTypes.array.isRequired
};

PollQuestions.defaultProps = {
	polls: []
};

export default PollQuestions;
