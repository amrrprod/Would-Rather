import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleAddQuestion } from '../actions/shared';
import { Button, Form, Grid, Header } from 'semantic-ui-react'


class Add extends Component {
	state = {
		firstOption: '',
		secondOption:''
	}

	handleFirstOption = (e)=>{
		const firstOption = e.target.value
		console.log('firstOption: ', firstOption)
		this.setState(()=>({
			firstOption
		}))
	}

	handleSecondOption = (e) => {
		const secondOption = e.target.value
		console.log('secondOption: ', secondOption)
		this.setState(()=>({
			secondOption
		}))
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const {firstOption, secondOption} = this.state
		const {dispatch} = this.props
			dispatch(handleAddQuestion(firstOption, secondOption))
				this.setState(()=>({
					firstOption:'',
					secondOption:''
				}))
				this.props.history.push('/');
	}



render(){
	return(
		<Grid textAlign='center' style={{ height: '500px' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
			 <Form 
			 style={{ padding: '15px', borderRadius:'5px', boxShadow:'0 0 5px #dadada'}}
			 onSubmit={this.handleSubmit}>

			  <Header as='h2' color='teal' textAlign='center' style={{backgroundColor:'#f7f7f7', padding:'10px'}}>
		         Create New Question
		      </Header>

	    <Form.Field>
	      <label>Would You Rather</label>
		      <input 
		      type='text'
		      placeholder='First Option'
		      value={this.state.firstOption}
		      onChange={this.handleFirstOption}
		      required/>
	    </Form.Field>
    
	    <Form.Field>
	      <label>or</label>
		      <input 
		      type='text'
		      placeholder='Second Option'
		      value={this.state.secondOption}
		      onChange={this.handleSecondOption}
		      required/>
	    </Form.Field>

    <Button type='submit' className='tealNotDisabeled'
    disabled={ this.state.firstOption === '' || this.state.secondOption === ''}
     
     >Submit</Button>
  </Form>
    </Grid.Column>
  </Grid>
		)
}
}


export default withRouter(connect()(Add))