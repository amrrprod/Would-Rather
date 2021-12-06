import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Card, Image, Container, Grid } from 'semantic-ui-react'
const Question = (props)=>{


const {id, name, avatar, text} = props
if (props === null){
	return <p>There's Nothing To Show.</p>
}
	const viewPoll = (id)=>{
		props.history.push(`questions/${id}`)
	}
return(


<Card.Group>
    <Card>
      <Card.Content>
        <div >
        	<Image
          floated='right'
          size='mini'
          src={avatar}
        />
        <Card.Header>{name} asks</Card.Header>

        </div>
        <Card.Description>
          <h4>Would you rather</h4>
            <p>{text}</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green' onClick={(e)=> viewPoll(id)}>
            View Poll
          </Button>
        </div>
      </Card.Content>
    </Card>
  </Card.Group>

	)
}


function mapStateToProps({questions, users}, {id}){
	const question = questions[id]
	return{
		id: question.id,
		name:users[question.author].name,
		avatar: users[question.author].avatarURL,
		text: question.optionOne.text,

	}
}

export default withRouter(connect(mapStateToProps)(Question))