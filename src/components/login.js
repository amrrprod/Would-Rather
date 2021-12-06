import React, { Component } from 'react';
import { connect } from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'
import { Dropdown } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

class Login extends Component {
  state = {
    approved: '',
    user: '',
  }


handleAuth = (e) => {
  e.preventDefault()
  this.props.dispatch(setAuthedUser(this.state.user));
  this.props.history.goBack();
}

updateState = (e, {value}) => {
const user = value
const approved = e.target.textContent
 this.setState({
  approved:approved,
  user:user
 })
}

allUsers = () => {
  const users = this.props
//these are semantic ui dropdown component values 
  return this.props.userIds.map(user =>({
    text :user.name,
    value: user.id,
    key:user.id,
    image: {avatar: true, src: user.avatarURL}
  }))
}
render(){
  const {user} = this.state
  console.log(this.state)
  return(
         <Grid textAlign='center' style={{ height: '500px' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
         Welcome to would you rather app
      </Header>
      <h5>Please sign in to continue</h5>
      <Form size='large' onSubmit={this.handleAuth}>
        <Segment stacked>

{/*        <select
          className="browser-default"
          onChange={this.updateState}
          value={this.state.user}
        >
         <option value="none" disabled>
            Choose user
          </option>
          {this.props.userIds.map(userId => (
            <option key={userId} value={userId}>
            <img src='this.props.users[userId].avatarURL'/>
              {this.props.users[userId].name}
            </option>
          ))}
        </select>*/}

 <Dropdown
    placeholder='Select Username'
    fluid
    selection
    options={this.allUsers()}
    onChange={this.updateState}
  />
         

          <Button 
          color={this.state.approved === '' ? 'grey' : 'teal'}
           fluid size='large' style={{ marginTop:'10px' }}
           disabled={this.state.approved === ''}>
            Login
          </Button>
        </Segment>
      </Form>
      
    </Grid.Column>
  </Grid>

    )
}




}
function mapStateToProps({ users }) {
  return {
    userIds: Object.values(users),
    users
  }
}
{/*
const DropdownExampleSelection = () => (
  <Dropdown
    placeholder='Select Friend'
    fluid
    selection
    options={getUsers()}
  />
)
export default withRouter(connect(mapStateToProps)(Login));
*/}

export default withRouter(connect(mapStateToProps)(Login))