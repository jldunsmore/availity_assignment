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

      handleValidation(formData) {
        let validated = true;
        if(!(/^\(\d{3}\)\s\d{3}-\d{4}$/.test(formData.get('phoneNumber')))) {
            validated = false;
        } 

        if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(formData.get('emailAddress')))) {
            validated = false;
        }

        return validated;
      }
    
      // there should be better validation than this
      // i am sure there is a library that could be used to build better forms
      handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        if(this.handleValidation(formData)) {
            let object = {};
            formData.forEach((value, key) => object[key] = value);
            var json = JSON.stringify(object);

            console.log(json);
            // send data to backend with a REST call or something
        }
        console.log("form invalid");    
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
              <table>
              <tbody>
                  <tr>
                    <td className="label">First Name</td>
                    <td>
                        <input type="text" id="firstName" name="firstName"/>
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Last Name </td>
                    <td>
                        <input type="text" id="lastname" />
                    </td>
                  </tr>
                  <tr>
                    <td className="label">NPI number </td>
                    <td>
                        <input type="text" id="npiNumber" />
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Business Address </td>
                    <td>
                        <textarea id="buisnessAddress"/>
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Telephone Number </td>
                    <td>
                        <input type="text" id="phoneNumber"  name="phoneNumber"/>
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Email address </td>
                    <td>
                        <input type="text" id="emailAddress" />                         
                    </td>
                  </tr>
              </tbody>
              </table>
            <br />
            <input type="submit" value="Submit" />
          </form>
        );
      }
}