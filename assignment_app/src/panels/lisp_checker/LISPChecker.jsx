import React from 'react';

import './lisp.css';

export default class LISPChecker extends React.Component{
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    let validate = this.validateLISP(this.state.value);
    let message = (validate) ? 'LISP was CORRECTLY formated' : 'LISP was INCORRECTLY formated';

    alert(message);

    event.preventDefault();
  }

  // I thought of using regular expression but looking for a good one example
  // I found that there can be problems with deep nesting
  // this is the first idea, but I think there must be a better way to
  // also the part "parentheses in the string are properly closed and nested" 
  // It has been a long time since I programmed in LISP!
  validateLISP(lisp) {
    let brackets = 0;
    let length = lisp.length;
    while(length--) {
      let letter = lisp.charAt(length);
      console.log(letter);
      console.log(brackets);
      if(letter === '(') brackets++;
      if(letter === ')') brackets--;
    }

    return (brackets === 0) ? true : false;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          LISP Expression:<br />
          <textarea className="lisp" value={this.state.value} onChange={this.handleChange} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}