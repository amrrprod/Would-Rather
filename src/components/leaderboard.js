import React from 'react'
import { connect } from 'react-redux'
import LeaderboardSingle from './leaderboardSingle'
import PropTypes from 'prop-types'
import { Button, Card, Image, Container, Grid } from 'semantic-ui-react'

const Leaderboard = ({users}) => (
	<Container>
		{Object.keys(users).map(user => {
			return{
				...users[user],
				score: Object.keys(users[user].answers).length + users[user].questions.length
			}
		}).sort((a,b) => b.score - a.score).map(user => (
			<div key={user.id} className='LeaderboardBox'>
            <LeaderboardSingle id={user.id} />
          </div>))}

	</Container>
	)


Leaderboard.propTypes = {
  users: PropTypes.object.isRequired
}

function mapStateToProps({ users }) {
  return {
    users
  }
}

export default connect(mapStateToProps)(Leaderboard)