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
      style: {
        transform: "translate(100%)"
      },
      poll: {
        question: "",
        answers: [],
        userAnswers: []
      }
    };

    this.mountStyle = this.mountStyle.bind(this);

    this.handleRadioBtn = this.handleRadioBtn.bind(this);
    this.vote = this.vote.bind(this);
    this.reset = this.reset.bind(this);
    this.edit = this.edit.bind(this);
    this.showPoll = this.showPoll.bind(this);
  }

  componentDidMount() {
    // call the animation and populate poll
    this.showPoll();
    setTimeout(this.mountStyle, 10);
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    //prevProps.polls[id]
    debugger;
    if (
      prevProps.match.params.id !== id ||
      this.props.polls[id] !== prevProps.polls[id]
    ) {
      this.showPoll();
    }
  }

  mountStyle() {
    // css for mount animation
    this.setState({
      style: {
        transform: "translate(0%)",
        transition: "all 0.5s ease"
      }
    });
  }

  componentWillUnmount() {
    debugger;
    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.props.updatePoll(this.state.poll, id);
  }

  vote() {
    let updatedUserAnswers = this.state.poll.userAnswers.map((answer, i) => {
      if (i === this.state.checked) {
        answer.vote++;
      }
      return answer;
    });
    let poll = { ...this.state.poll };
    poll.userAnswers = updatedUserAnswers;
    this.setState({ poll, checked: "" });
  }

  reset() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    let poll = { ...this.state.poll };
    delete poll.userAnswers;
    this.props.updatePoll(poll, id);
  }

  edit() {
    this.props.history.push({
      pathname: `/create-poll/${this.props.match.params.id}`
    });
  }

  showPoll() {
    debugger;
    const id = this.props.match.params.id;
    const polls = this.props.polls;

    const poll = polls.filter((poll, i) => {
      return i === parseInt(id);
    });

    if (!poll[0]) {
      this.props.history.push("/");
      return;
    }
    if (!poll[0].userAnswers) {
      poll[0].userAnswers = poll[0].answers.map((answer, i) => {
        return {
          name: `Answer ${i + 1}`,
          vote: 0
        };
      });
    }
    debugger;
    this.setState({ poll: poll[0] });
  }

  handleRadioBtn(e) {
    const indexBtn = parseInt(e.target.getAttribute("data-index"));
    this.setState({ checked: indexBtn });
  }

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
                <button
                  id="vote"
                  className="button is-primary"
                  onClick={() => this.vote()}
                >
                  Vote!
                </button>
                <button
                  id="reset"
                  className="button is-primary"
                  onClick={() => this.reset()}
                >
                  Reset
                </button>
                {(this.state.poll.owner === this.props.userName ||
                  this.state.poll.owner === "Anonymous") && (
                  <button
                    id="edit"
                    className="button is-primary"
                    onClick={() => this.edit()}
                  >
                    edit
                  </button>
                )}
              </Form>
            </div>
            <div className="column">
              <PollAnswers userAnswers={this.state.poll.userAnswers} />
            </div>
          </div>
        </Section>
      </div>
    );
  }
}

PollQuestions.propTypes = {
  polls: PropTypes.array.isRequired,
  userName: PropTypes.string.isRequired
};

PollQuestions.defaultProps = {
  polls: [],
  userName: ""
};

export default PollQuestions;
