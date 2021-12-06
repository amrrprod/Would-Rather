import React, { Component, Fragment } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom'
import {setAuthedUser} from '../actions/authedUser'

{/*
	const { activeItem } = this.state
({ authedUser, users })
*/}
class Nav extends Component{
	state = {
		activeItem: '',
	}

render(){
	const { activeItem } = this.state
	const { authedUser, users } = this.props
	console.group('nav:')
	console.log(this.props.authedUser)
	console.groupEnd()
	return(
			 <div>
        <Menu tabular>
        <Menu.Item as={ NavLink }
            name='home'
            to='/'
            exact
            active={activeItem === 'home'}
          />
           
        <Menu.Item as={ NavLink }
            name='New Question'
            to='/add'
            active={activeItem === 'new'}
          />
         
        <Menu.Item as={ NavLink }
            name='Leaderboard'
            to='/leaderboard'
            active={activeItem === 'Leaderboard'}
          />
         
          <Menu.Menu position='right'>
 
 {authedUser === null ? ('') : 
 (

  <Fragment>
    <Menu.Item name={'Hello, ' + users[authedUser].name} />
    <span></span>
    <Menu.Item>
    <img src={users[authedUser].avatarURL} className='circled-img'/>
    </Menu.Item>

 	 
    <Menu.Item as={ NavLink } name='Logout' to="/logout" active={activeItem === 'Signout'} />
 	 </Fragment> )}      
 

        

          </Menu.Menu>
        </Menu>

      </div>
		)
}
  
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  };
}

export default connect(mapStateToProps)(Nav);
