import React, { Component } from "react";
import '../App.css';

const regExp = RegExp(
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
)

const formValid = ({ isError, ...rest }) => {
    let isValid = false;

    Object.values(isError).forEach(val => {
        if (val.length > 0) {
            isValid = false
        } else {
            isValid = true
        }
    });

    Object.values(rest).forEach(val => {
        if (val === null) {
            isValid = false
        } else {
            isValid = true
        }
    });

    return isValid;
};

export default class UserForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
            describe:'',
            hidden: true,
            btnValide: false,
            isError: {
                name: '',
                email: '',
                password: '',
                describe:''
            }
        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
      }
      toggleShow() {
        this.setState({ hidden: !this.state.hidden });
      }
      componentDidMount() {
        if (this.props.password) {
          this.setState({ password: this.props.password });
        }
      }

    onSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log(this.state)
        } else {
            console.log("Form is invalid!");
        }
    };


    formValChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let isError = { ...this.state.isError };

        switch (name) {
            case "name":
                isError.name =
                    value.length < 5 ? "Minimum 5 characters" : "";
                break;
            case "email":
                isError.email = regExp.test(value)
                    ? ""
                    : "Please enter a valid email address";
                break;
            case "password":
                isError.password =
                    value.length < 8 ? "Minimum 8 characters" : "";
                break;
            default:
                break;
        }

        this.setState({
            isError,
            [name]: value
        })
    };

    render() {
        const { isError } = this.state;

        return (
            <form onSubmit={this.onSubmit} noValidate>
            <div className="input_group firstName">
            
              <input
                className={isError.name.length > 0 ? "error" : ""}
                type="text"
                name="name"
               
                onChange={this.formValChange}
              />
                <label htmlFor="firstName" className={isError.name.length > 0 ? "error" : ""}>Your name</label>
              
               {isError.name.length > 0 && (
                        <span className="errorMessage">{isError.name}</span>
                    )}
            </div>
            <div className="input_group email">
             
              <input
                className={isError.email.length > 0 ? "error" : ""}        
                type="email"
                name="email"       
                onChange={this.formValChange}
              />
               <label htmlFor="email" className={isError.email.length > 0 ? "error" : ""}>Email address</label>
               {isError.email.length > 0 && (
                        <span className="errorMessage">{isError.email}</span>
                    )}
            </div>

            <div className="firstName describe">          
               <select name="describe" onChange={this.formValChange} id="selectBox">   
                  <option value="none">I would describe my user type as</option>
                  <option value="developer">Developer</option>
                  <option value="design">Design</option>
               </select>
            </div>        
           
            <div className="input_group password">
           
              <input
                 className={isError.password.length > 0 ? "error" : ""}
                // placeholder="Password"
                type={this.state.hidden ? 'password' : 'text'}
                name="password"
             
                onChange={this.formValChange}
              />
              <label htmlFor="password" className={isError.password.length > 0 ? "error" : null}>Password</label>
              {isError.password.length > 0 && (
                        <span className="errorMessage">{isError.password}</span>
                    )}
              <button className="passwordBtn" onClick={this.toggleShow}><i className="fas fa-eye"></i></button>
            </div>
            <div className="createAccount">
              {/* {console.log(this.state.isLocked)} */}
              <button type="submit" className={this.state.btnValide ? "activeBtn" : "deactiveBtn"} >Next</button>
            </div>
          </form>
        );
    }
}