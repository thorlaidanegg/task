import React, { Component } from 'react';
import { fetchData } from './api';
import './materialize.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: [],
      feedback: [],
      selectedChoices: {},
    };
  }

  componentDidMount() {
    this.getChoices();
    this.getFeedback();
  }

  getChoices = () => {
    fetchData().then((data) => this.setState({ choice: data.choices[0] }));
  };

  getFeedback = () => {
    fetchData().then((data) => this.setState({ feedback: data.feedbackQuestions }));
  };

  handleChoiceChange = (questionIndex, choice) => {
    this.setState((prevState) => ({
      selectedChoices: {
        ...prevState.selectedChoices,
        [this.state.feedback[questionIndex]]: choice,
      },
    }));
  };

  handleSubmit = () => {
    const feedbackData = {
      feedback: {
        questions: Object.values(this.state.feedback),
        choices: Object.values(this.state.selectedChoices)
      },
    };
    console.log('Formatted Feedback Data:', feedbackData);
  };

  render() {
    return (
      <>
        <div className="container">
          <h1 className='center-align'>Feedback Form</h1>
          <form>
            {this.state.feedback.map((ques, i) => (
              <div className="card" key={i}>
                <h4 className="card-title">{ques}</h4>
                <form className='card-content' action="#" key={`form${i}`}>
                  {this.state.choice.map((singleChoice, j) => (
                    <p key={j}>
                      <label>
                        <input
                          name={`ques${i}`}
                          type="radio"
                          onChange={() => this.handleChoiceChange(i, singleChoice)}
                        />
                        <span>{singleChoice}</span>
                      </label>
                    </p>
                  ))}
                </form>
              </div>
            ))}
            <button
              type="button"
              className="btn waves-effect waves-light"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default App;

