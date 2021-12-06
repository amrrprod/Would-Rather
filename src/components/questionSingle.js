import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { handleAddAnswer } from '../actions/shared';
import PropTypes from 'prop-types';
import { Button, Card, Image, Container, Grid, Progress } from 'semantic-ui-react'

class QuestionSingle extends Component {
	state= {
		option:'',
		submit: true
	}


	handleSubmit = (e)=>{
		e.preventDefault()
		this.setState({submit:true})
		const {dispatch} = this.props
		const {option} = this.state
    console.log(option)

		dispatch(handleAddAnswer(this.props.match.params.question_id, option))

		this.props.history.push(`/questions/${this.props.match.params.question_id}`)
	}


	handleSelection = (option)=>{
		this.setState(()=>({option, submit:false}))
	}


	Percentage = (countVotes, allVotes) => {
    let percent = 0;
    if (countVotes > 0) {
      percent = Math.round((countVotes / allVotes) * 100)
    }
    return percent
  }



  render(){

  		const {authedUser, users, questions} = this.props
  		const question = questions[this.props.match.params.question_id]
  		if(!question){return <Redirect to='/404'/>}


  			const getVotes = question.optionOne.votes.length + question.optionTwo.votes.length
  			const firstQuestionPercentage = this.Percentage(question.optionOne.votes.length, getVotes)
  			const secondQuestionPercentage = this.Percentage(question.optionTwo.votes.length, getVotes)
if (
      question.optionOne.votes.indexOf(authedUser) !== -1 ||
      question.optionTwo.votes.indexOf(authedUser) !== -1
    ){return(
    		<Container>
    <Card>
      <Card.Content>
        <div >
        	<Image
          floated='right'
          size='mini'
          src={users[question.author].avatarURL}
        />
        <Card.Header> {users[question.author].name}</Card.Header>

        </div>
        <Card.Description>
         <h3 className='center'>Results</h3>

         <div>
                      <div className='singleOption'>
                      	<h3>{question.optionOne.text}</h3>
                      {question.optionOne.votes.indexOf(authedUser) !== -1 ? (
                        <span className="choice">Your choice</span>
                      ) : (
                        false
                      )}
                      <div className="progress boxx">
                      <Progress percent={firstQuestionPercentage} progress color='teal'>
						{question.optionOne.votes.length} out of {getVotes}{' '}
                        {getVotes > 1 ? 'votes' : 'vote'}
                      </Progress>
                        
                      </div>
                      </div>



                    <div className='singleOption'>
                      <h3>{question.optionTwo.text}</h3>
                      {question.optionTwo.votes.indexOf(authedUser) !== -1 ? (
                        <div className="choice">Your choice</div>
                      ) : (
                        false
                      )}
                      <div className="progress boxx">
                       <Progress percent={secondQuestionPercentage} progress color='teal'>
						{question.optionTwo.votes.length} out of {getVotes}{' '}
                        {getVotes > 1 ? 'votes' : 'vote'}
                      </Progress>
                        
                      </div>
                      
                      </div>
                      </div>
         </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
        </div>
      </Card.Content>
    </Card>
    </Container>
    	)}
  	return(
<Container>
	<Card.Group>
    <Card>
      <Card.Content>
        <div >
        	<Image
          floated='right'
          size='mini'
           src={users[question.author].avatarURL}
        />
        <Card.Header>{users[question.author].name} asks</Card.Header>

        </div>
        <Card.Description>
          <h4>Would you rather...</h4>
                  <form onSubmit={this.handleSubmit} className="answerForm">
                    <p>
                      <label>
                        <input
                          name="options"
                          type="radio"
                          onChange={() => this.handleSelection('optionOne')}
                          checked={this.state.option === 'optionOne'}
                        />
                        <span>{question.optionOne.text}</span>
                      </label>
                    </p>

                    <p>
                      <label>
                        <input
                          name="options"
                          type="radio"
                          onChange={() => this.handleSelection('optionTwo')}
                          checked={this.state.option === 'optionTwo'}
                        />
                        <span>{question.optionTwo.text}</span>
                      </label>
                    </p>
<div className='ui two buttons'>
                    <Button color='green'
                      className="tealNotDisabeled submitanswer"
                      disabled={this.state.submit}
                    >
                      SUBMIT YOUR ANSWER{' '}
                    </Button>
                    </div>
                  </form>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
        </div>
      </Card.Content>
    </Card>
  </Card.Group>
</Container>
  		)
  }
}
QuestionSingle.propTypes = {
  questions: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  authedUser: PropTypes.string.isRequired
}

function mapStateToProps({ questions, users, authedUser }) {
  return {
    authedUser,
    questions,
    users
  }
}

export default withRouter(connect(mapStateToProps)(QuestionSingle))