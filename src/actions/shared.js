import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api'
import { addQuestion, addAnswer, receiveQuestions } from './qa'
import { usersReceive, questionAdd, answer } from './users'
import { setAuthedUser } from './authedUser'
import {showLoading, hideLoading} from 'react-redux-loading'


const AUTHED_ID = null


export function handleInitialData(){
	return (dispatch) => {
		dispatch(showLoading())
		return getInitialData()
			.then(({ users, questions }) => {
				dispatch(receiveQuestions(questions))
				dispatch(usersReceive(users))
				dispatch(setAuthedUser(AUTHED_ID))
				dispatch(hideLoading())
			})
	}
}


{/*
We have to handle actions in the shared file because of nested ones!!
*/}

export function handleAddQuestion(optionOneText, optionTwoText) {
	return(dispatch, getState) => {
		const {authedUser} = getState()
			dispatch(showLoading())
				return saveQuestion({
          				optionOneText,
          				optionTwoText,
						author: authedUser
					})

				.then(question =>{
					dispatch(addQuestion(question))
					dispatch(questionAdd(authedUser, question.id))
					dispatch(hideLoading())
				})
				
	}
}



export function handleAddAnswer (questionId, option){
	return(dispatch, getState) => {
		const {authedUser} = getState()

			dispatch(showLoading())

				return saveQuestionAnswer({
					authedUser,
					qid: questionId,
					answer: option
				})
					.then(()=>{
						dispatch(answer(authedUser, questionId, option))
						dispatch(addAnswer(authedUser, questionId, option))
			dispatch(hideLoading())
					})
	}
}