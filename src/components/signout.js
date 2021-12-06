import React, { Component } from 'react'
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Redirect } from "react-router-dom";

class Signout extends Component {

    componentWillMount() {
        this.props.dispatch(setAuthedUser(null))
    } 

    render() {
        return <Redirect to="/login" />;

  }
}

function mapStateToProps({ authedUser }) {
    return {
        logedin: authedUser
    }
}

export default connect(mapStateToProps)(Signout)
