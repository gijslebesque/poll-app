import React, { Component } from "react";
import PollAnswers from "../PollAnswers/PollAnswers";
import PropTypes from "prop-types";
import Section from "../Section";
import Form from "../Form";

class PollQuestions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			style: {
				transform: "translate(100%)"
			},
			poll: {
				question: "",
				answers: []
			},
			answers: []
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
		// this.unMountStyle();
		// setTimeout(this.props.clickNextHandler, 100);
	};

	showPoll = () => {
		console.log(this.props);
		const {
			match: {
				params: { id }
			},
			polls
		} = this.props;

		const poll = polls.filter((poll, i) => {
			return i === parseInt(id);
		});

		if (!poll[0]) {
			this.props.history.push("/");
			return;
		}
		this.setState({ poll: poll[0] });
	};
	handleRadioBtn = e => {};

	render() {
		const { poll } = this.state;
		console.log(this.state.answers);
		return (
			<div className="wrapper" style={this.state.style}>
				<Section title={poll.question} subtitle={`asked by ${poll.owner}`}>
					<Form name="Answers">
						{poll &&
							poll.answers.map((answer, i) => {
								return (
									<div key={i}>
										<label className="radio">
											<input
												type="radio"
												name="answer"
												data-index={i + 1}
												value={answer.value}
												onChange={e => this.handleRadioBtn(e)}
											/>
											{answer.value}
										</label>
									</div>
								);
							})}
						<button className="button" onClick={e => this.vote(e)}>
							Vote!
						</button>
					</Form>
				</Section>
				<PollAnswers
					pollQuestion={this.state.pollQuestion}
					answers={this.state.answers}
				/>
			</div>
		);
	}
}

PollQuestions.propTypes = {
	show: PropTypes.bool.isRequired,
	pollQuestion: PropTypes.func.isRequired,
	answers: PropTypes.array.isRequired,
	children: PropTypes.any
};

export default PollQuestions;
