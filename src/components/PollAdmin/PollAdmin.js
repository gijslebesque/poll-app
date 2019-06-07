import React, { Component } from "react";
import PropTypes from "prop-types";

class PollAdmin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			style: {
				transform: "translate(-100%)",
				transition: "all 1s ease"
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

	render() {
		return (
			<section style={this.state.style}>
				<form>
					<input
						type="text"
						placeholder="What do you want to poll?"
						name="question"
						onChange={e => this.props.handleQuestion(e)}
					/>
				</form>
				<form>
					{this.props.answers.map((input, i) => (
						<div key={i}>
							<input
								type="text"
								name={input.name}
								value={input.value}
								onChange={e => {
									this.props.changeQuestion(e, i);
								}}
							/>
							<button onClick={e => this.props.deleteInput(e, i)}>
								Delete
							</button>
						</div>
					))}
				</form>

				<button onClick={e => this.props.addQuestion(e)}>
					CLICK ME TO ADD AN INPUT
				</button>
				<button onClick={e => this.clickNextHandler(e)}>Next</button>
			</section>
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
