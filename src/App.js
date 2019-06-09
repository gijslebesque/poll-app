import React, { Component } from "react";
import "bulma/css/bulma.css";
import NavBar from "./components/Nav/NavBar";
import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import PollAdmin from "./components/PollAdmin/PollAdmin";
import PollQuestion from "./components/PollQuestion/PollQuestion";
import Modal from "./components/Modal";
import Section from "./components/Section";
import history from "./history";

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

	addPoll = poll => {
		debugger;
		const newPolls = [...this.state.polls];
		poll.owner = this.state.userName ? this.state.userName : "Anonymous";
		newPolls.push(poll);
		this.setState({ polls: newPolls });
		history.push(`/poll/${newPolls.length - 1}`);
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
								<p className="menu-label">Polls</p>
								{this.state.polls.map((poll, i) => {
									return (
										<li key={i}>
											<Link className="menu-label" to={`/poll/${i}`}>
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
											userName={this.state.userName}
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
										<PollQuestion {...props} polls={this.state.polls} />
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
