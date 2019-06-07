import React, { Component } from "react";
import PollAnswers from "../PollAnswers/PollAnswers";
import PropTypes from "prop-types";

class PollQuestions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			style: {
				transform: "translate(100%)"
			}
		};
	}
	componentDidMount() {
		setTimeout(this.mountStyle, 10); // call the into animation
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
		// css for mount animation
		this.setState({
			style: {
				transform: "translate(100%)",
				transition: "all 0.5s ease"
			}
		});
	};

	clickNextHandler = () => {
		this.unMountStyle();
		setTimeout(this.props.clickNextHandler, 100);
	};
	render() {
		return (
			<div className="wrapper" style={this.state.style}>
				<section className="moveIn">
					{this.props.children}
					<form action="">
						{this.props.answers.map(answer => {
							return (
								<div>
									<input type="radio" name="question" />
									<label htmlFor={answer.name}>{answer.value}</label>
								</div>
							);
						})}
					</form>
					<button onClick={e => this.clickNextHandler(e)}>Next</button>
				</section>
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
