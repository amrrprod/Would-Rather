import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, Image, Container, Grid } from 'semantic-ui-react'
const LeaderboardSingle = ({ name, avatar, answers, questions }) => {
console.log(name, ': ',questions)
		return (
			<Card.Group>
    <Card className='LeaderboardSingle'>
      <Card.Content >
        <div >
        	<Image
          floated='right'
          size='mini'
          src={avatar}
        />
        <Card.Header>{name}</Card.Header>

        </div>
        <Card.Description>
        <div className='ui two buttons' style={{margin:'25px auto 10px auto'}}>
        	 <Button basic color='teal'>Answered questions {answers}</Button>
        </div>
        <div className='ui two buttons' style={{margin:'5px auto 10px auto'}} >
        	 <Button basic color='teal'>Created questions {questions}</Button>
        </div>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
        <Button color='teal'>score</Button>
        <Button basic color='teal'>{answers + questions}</Button>
        </div>
      </Card.Content>
    </Card>
  </Card.Group>
			)
	}
//}
function mapStateToProps ({users}, {id}){
	const user = users[id]

	return{
		name: user.name,
	    avatar: user.avatarURL,
	    answers: Object.keys(user.answers).length,
	    questions: user.questions.length
	}
}

export default connect(mapStateToProps)(LeaderboardSingle);