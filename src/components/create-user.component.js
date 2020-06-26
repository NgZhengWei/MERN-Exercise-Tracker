import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);  //binds the keyword this to this class, else it will be undef
        this.onSubmit = this.onSubmit.bind(this);

        this.state = { //properties of the states that correspond to fields of MongoDB
            username: ""
        } //state is how we create variables in react. Whenever state is updated, the page will be updated with the new values
    }

    onChangeUsername(e){ //this is a method to edit the username from a textbox input
        this.setState({
            username: e.target.value //target refers to the text box
        });
    }

    onSubmit(e){
        e.preventDefault(); //prevents default html behavior

        const user = {
            username: this.state.username,
        }

        console.log(user); //connect database

        axios.post('http://localhost:5000/users/add', user) //sending post request to backend to save user
        .then(res => console.log(res.data));

        this.setState({
            username: ''
        })
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Create User"/>
                    </div>
                </form>
            </div>
        )
    }
}   