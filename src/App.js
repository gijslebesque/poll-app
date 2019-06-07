import React, { Component } from "react";
import "../node_modules/react-vis/dist/style.css";
import "bulma/css/bulma.css";
import NavBar from "./components/Nav/NavBar";
import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import PollAdmin from "./components/PollAdmin/PollAdmin";
import PollQuestion from "./components/PollQuestion/PollQuestion";

import "react-animated-slider/build/horizontal.css";

class App extends Component {
	constructor() {
		super();
		this.state = {
			user: {
				name: ""
			},

			polls: [
				{
					owner: "Gijs",
					question: "Hello there how can I help you?",
					answers: [
						{
							name: 0,
							value: "One"
						},
						{
							name: 0,
							value: "Two"
						}
					]
				}
			],
			question: "Pose a question",
			answers: [
				{
					name: 0,
					value: "One"
				},
				{
					name: 0,
					value: "Two"
				}
			],
			show: false,
			err: ""
		};
	}
	handleQuestion = e => {
		console.log(e.target.value);
		this.setState({ [e.target.name]: e.target.value });
	};

	addQuestion = e => {
		if (this.state.answers.lenth >= 10) return false;
		e.preventDefault();
		var newInput = {
			name: this.state.answers.length,
			value: ""
		};
		this.setState(prevState => ({
			answers: prevState.answers.concat([newInput])
		}));
	};

	changeQuestion = (e, i) => {
		e.preventDefault();
		const answers = [...this.state.answers];
		answers[i].value = e.target.value;

		this.setState({ answers });
	};

	deleteInput = (e, i) => {
		e.preventDefault();
		if (this.state.answers.length <= 2) return false;
		const answers = [...this.state.answers];
		answers.splice(i, 1);
		this.setState({ answers });
	};

	clickNextHandler = () => {
		this.setState({ show: !this.state.show });
	};

	render() {
		return (
			<div className="App">
				<NavBar />
				<h1>Sir Poll-a-lot</h1>
				<aside className="menu">
					<ul className="menu-list">
						<p class="menu-label">Polls</p>
						{this.state.polls.map((poll, i) => {
							return (
								<li>
									<Link className="menu-label" key={i} to={`/poll/${i}`}>
										{`${i + 1}. ${poll.question} by ${poll.owner}`}
									</Link>
								</li>
							);
						})}
					</ul>
				</aside>

				<main>
					<Switch>
						<Route
							exact
							path="/create-poll"
							render={props => (
								<PollAdmin
									{...props}
									handleQuestion={this.handleQuestion}
									addQuestion={this.addQuestion}
									answers={this.state.answers}
									changeQuestion={this.changeQuestion}
									deleteInput={this.deleteInput}
									clickNextHandler={this.clickNextHandler}
								/>
							)}
						/>
						<Route
							exact
							path="/poll/:id"
							render={props => (
								<PollQuestion
									{...props}
									show={this.state.show}
									pollQuestion={this.state.pollQuestion}
									answers={this.state.answers}
									clickNextHandler={this.clickNextHandler}
								/>
							)}
						/>
					</Switch>
				</main>
			</div>
		);
	}
}

export default App;
