import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => { //this functional exercise component is used below in exercise list. No state and lifecycle methods.
    return(
        <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/" + props.exercise._id}>edit</Link> | <a href="#" onClick={() => {props.deleteExercise(props.exercise._id)}}>delete</a>
        </td>
    </tr>
    )
}

export default class ExerciseList extends Component {
    constructor(props){
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
        .then(response => {
            this.setState({ exercises: response.data }) //put all the data from exercises into the exercises array
        })
        .catch(error => {
            console.log(error);
        })
    }

    deleteExercise(id){ //deleting by MongoDB object id
        axios.delete('http://localhost:5000/exercises/' + id)  //send delete request
        .then(res => console.log(res.data)); //log the message received from backend "exercise deleted"

        this.setState({ //delete the user from the display table too
            exercises: this.state.exercises.filter(el => el._id != id) //only display certain exercises hence filter
        }) //For every exercise, we will return it if it's id is not the deleted id
    }

    exerciseList(){
        return this.state.exercises.map(currentexercise =>{
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}   