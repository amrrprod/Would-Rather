import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './question';
import PropTypes from 'prop-types';
import { Dropdown, Icon, Menu, Segment, Container, Grid, Row } from 'semantic-ui-react'


class Questions extends Component{
	state = {
		active: 'unanswered'
	}

	handleActiveStatus = (status)=>{
		this.setState(()=>({active:status}))
	}


render(){
	const { displayQuestions } = this.props

return(
		<Container className="questionsMenu">
			<div className='questionsBox'>
    <Menu attached='top'>
     
<Grid.Row columns={2}>
	<Grid.Column>
	<Menu.Menu >
        <div className='ui  category search item'>

          <a onClick={() => this.handleActiveStatus('unanswered')}
          	 className={`${this.state.active === 'unanswered' ? 'active' : ''}`}>
          	 Unanswered Questions</a>

          </div>
      </Menu.Menu>
	</Grid.Column>
	<Grid.Column>
	 <Menu.Menu>
        <div className='ui   category search item'>
          <a onClick={() => this.handleActiveStatus('answered')}
             className={`tab-nav ${this.state.active === 'answered' ? 'active' : ''}`}>
                Answered Questions
                </a>
          <div className='results' />
        </div>
      </Menu.Menu>
	</Grid.Column>

</Grid.Row>
     
    </Menu>

    <Segment attached='bottom'>
      <div className={`unanswered ${this.state.active === 'unanswered' ? 'active' : ''}`} >
      {displayQuestions.filter(question => 
      question.optionOneAnswered !== true && question.optionTwoAnswered !== true)
      .map(question => {return(
      	<div key={question.id} style={{display: 'block', width:'100%', }}>
      		<Question id={question.id}/>
      	</div>
      	)})
      }
      </div> 

      <div className={`answered ${this.state.active === 'answered' ? 'active' : ''}`} >
      {displayQuestions.filter(question => 
      question.optionOneAnswered === true || question.optionTwoAnswered === true)
      .map(question => {return(
      		<div key={question.id} style={{display: 'block', width:'100%', }}>
      		<Question id={question.id}/>
      		</div>
      	)})
      }
      </div>
    </Segment>
  </div>
		</Container>
	)


}



}
{/*Controled data */}
Questions.propTypes = {
  displayQuestions: PropTypes.array.isRequired
};

function mapStateToProps({questions, authedUser}){
	return{
		displayQuestions:Object.keys(questions).map(question => {
			return{
				...questions[question],
				optionOneAnswered: questions[question].optionOne.votes.indexOf(authedUser) === -1 ? false : true,
				optionTwoAnswered: questions[question].optionTwo.votes.indexOf(authedUser) === -1 ? false : true
			}
		}).sort((a,b) => b.timestamp - a.timestamp)
	}
}
export default connect(mapStateToProps)(Questions);