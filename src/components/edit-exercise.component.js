import React, { Component } from 'react';
import axios from 'axios';
import Datepicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; //styling for datepicker

export default class EditExercises extends Component { //variavles are never used globally across components, only locally in methods
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);  //binds the keyword this to this class, else it will be undef
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = { //properties of the states that correspond to fields of MongoDB
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            users: []
        } //state is how we create variables in react. Whenever state is updated, the page will be updated with the new values
    }

    componentDidMount(){ //React lifecycle method. This is called right before anything is displayed on page.
        axios.get('http://localhost:5000/exercises/' + this.props.match.params.id) //getting the id direct fom url
        .then( response => {
            this.setState({
                username: response.data.username,
                description: response.data.description,
                duration: response.data.duration,
                date: new Date(response.data.date)
            })
        })
        .catch(function (error) {
            console.log(error);
        })

        axios.get('http://localhost:5000/users/')
        .then(response => {
            if (response.data.length > 0) {
                this.setState({ //basically gets the array of users and calls the .username attribute to add to the users array
                    users: response.data.map(user => user.username), //data is an array and map allows us to do something to all items in that array
                    username: response.data[0].username //username is automatically set to the first user in the database
                })
            }
        })
    }

    onChangeUsername(e){ //this is a method to edit the username from a textbox input
        this.setState({
            username: e.target.value //target refers to the text box
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e){
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date){ //will use a library what makes a clickable calender appear
        this.setState({
            date: date
        });
    }

    onSubmit(e){
        e.preventDefault(); //prevents default html behavior

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise) //sending post request to backend to save user
        .then(res => console.log(res.data));

        window.location = '/'; //takes user back to homepage

        console.log(exercise); //eventually will add exercise to database
    }


    render() {
        return (
          <div>
              <h3>Edit Exercise Log</h3>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label>Username: </label>
                    <select ref="userInput"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}> 
                        {
                            this.state.users.map(function(user) {
                                return <option
                                    key={user}
                                    value={user}>{user}
                                    </option>;
                            })
                        }
                    </select>
                  </div>
                  <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                  </div>
                  <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type="text"
                            className="form-control"
                            value={this.description}
                            onChange={this.onChangeDuration}
                            />
                  </div>
                  <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <Datepicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                                />
                        </div>
                  </div>

                  <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary"/>
                  </div>
              </form>
          </div>
        )
    }
}   //upon change of username, dropdown menu is created in the code block of this.state.users.map
//it takes the list of users from DB and maps them(returns something for each elem in an array), essentially creating user options
//Datepicker is a component to be created
//each section of the form is essentially created with a div for form group, label, input with the associalted type, className, value(displaying initial value) and onChange method to execute