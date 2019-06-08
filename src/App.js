import React, { Component } from "react";
import "../node_modules/react-vis/dist/style.css";
import "bulma/css/bulma.css";
import NavBar from "./components/Nav/NavBar";
import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import PollAdmin from "./components/PollAdmin/PollAdmin";
import PollQuestion from "./components/PollQuestion/PollQuestion";
import Modal from "./components/Modal";
import Section from "./components/Section";

class App extends Component {
	constructor() {
		super();
		this.state = {
			userName: "",

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
					value: ""
				},
				{
					name: 0,
					value: ""
				}
			],
			show: false,
			err: "",
			showModal: false
		};
	}
	setUserName = (field, name) => {
		this.setState({ [field]: name, showModal: false });
	};

	logout = () => {
		this.setState({ userName: "" });
	};
	toggleModal = () => {
		this.setState({ showModal: !this.state.showModal });
	};

	clickNextHandler = () => {
		this.setState({ show: !this.state.show });
	};
	addPoll = poll => {
		debugger;
		const newPolls = [...this.state.polls];
		poll.owner = this.state.userName ? this.state.userName : "Anonymous";
		newPolls.push(poll);
		this.setState({ polls: newPolls });
	};

	render() {
		return (
			<div className="App">
				<NavBar
					userName={this.state.userName}
					toggleModal={this.toggleModal}
					logout={this.logout}
				/>
				<Section
					title={`${this.state.userName} Sir Poll-a-lot`}
					subtitle="Poll some"
				>
					<div className="flex-container">
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
											addPoll={this.addPoll}
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
							{this.state.showModal && (
								<Modal
									setUserName={this.setUserName}
									toggleModal={this.toggleModal}
								/>
							)}
						</main>
					</div>
				</Section>
			</div>
		);
	}
}

export default App;
