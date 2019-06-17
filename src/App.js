import React, { Component } from "react";
import "bulma/css/bulma.css";
import NavBar from "./components/NavBar";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import PollAdmin from "./components/PollAdmin";
import PollQuestion from "./components/PollQuestion";
import Modal from "./components/Modal";
import history from "./history";
import Menu from "./components/Menu";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import ErrorBoundry from "./components/ErrorBoundry";

class App extends Component {
	constructor() {
		super();
		this.state = {
			userName: "",
			showModal: false,
			polls: [
				{
					owner: "Gijs",
					question: "Hello there how can I help you?",
					answers: [
						{
							name: 0,
							value:
								"One Sint magna officia commodo sint quis cupidatat veniam dolore cillum labore reprehenderit."
						},
						{
							name: 0,
							value: "Two"
						},
						{
							name: 0,
							value: "Three"
						}
					]
				}
			]
		};
	}

	getPoll = id => {
		const stateCopy = [...this.state.polls];
		return stateCopy.splice(id, 1);
	};
	setUserName = (field, name) => {
		this.setState({ [field]: name, showModal: false });
	};

	logout = () => {
		this.setState({ userName: "" });
		history.push("/");
	};
	toggleModal = () => {
		this.setState({ showModal: !this.state.showModal });
	};

	addPoll = (poll, id) => {
		const polls = [...this.state.polls];
		poll.owner = this.state.userName ? this.state.userName : "Anonymous";
		if (id) {
			polls[id] = poll;
			history.push(`/poll/${id}`);
		} else {
			polls.push(poll);
			history.push(`/poll/${polls.length - 1}`);
		}
		this.setState({ polls });
	};

	deletePoll = index => {
		const polls = [...this.state.polls];
		polls.splice(parseInt(index), 1);
		this.setState({ polls });
		history.push("/");
	};

	render() {
		return (
			<div className="App">
				<NavBar
					userName={this.state.userName}
					toggleModal={this.toggleModal}
					logout={this.logout}
				/>
				<>
					<header>
						<h1> {`Sir ${this.state.userName} Poll-a-lot`} </h1>
						<h2>Poll some</h2>
					</header>
					<div className="columns">
						<div className="column">
							<Menu polls={this.state.polls} />
						</div>
						<div className="column is-four-fifths">
							<Switch>
								<Route exact path="/" component={Home} />
								<Route
									path="/create-poll/:id?"
									render={props => (
										<ErrorBoundry>
											<PollAdmin
												{...props}
												getPoll={this.getPoll}
												userName={this.state.userName}
												addPoll={this.addPoll}
												deletePoll={this.deletePoll}
											/>
										</ErrorBoundry>
									)}
								/>
								<Route
									exact
									path="/poll/:id"
									render={props => (
										<PollQuestion
											{...props}
											userName={this.state.userName}
											polls={this.state.polls}
										/>
									)}
								/>
								<Route path="/*" component={NotFound} />
							</Switch>
							{this.state.showModal && (
								<Modal
									setUserName={this.setUserName}
									toggleModal={this.toggleModal}
								/>
							)}
						</div>
					</div>
				</>
			</div>
		);
	}
}

export default App;
