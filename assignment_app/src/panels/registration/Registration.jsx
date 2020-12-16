import React from 'react';

import './registration.css';

export default class Registration extends React.Component{
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
        alert("asdfasdfa");
    
        event.preventDefault();
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
              <table>
                  <tr>
                    <td className="label">First Name</td>
                    <td>
                        <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td className="label"> Last Name </td>
                    <td>
                        <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td className="label">NPI number </td>
                    <td>
                        <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Business Address </td>
                    <td>
                        <textarea />
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Telephone Number </td>
                    <td>
                        <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Email address </td>
                    <td>
                        <input type="text" />                         
                    </td>
                  </tr>
              </table>
            <br />
            <input type="submit" value="Submit" />
          </form>
        );
      }
}