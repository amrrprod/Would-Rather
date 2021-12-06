export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER = 'ADD_ANSWER'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'



export function addQuestion(question){
	return{
		type: ADD_QUESTION,
		question,
	}
}


export function addAnswer(authedUser, questionId, option){
	return{
		type: ADD_ANSWER,
		authedUser,
		option,
		questionId,
	}
}



export function receiveQuestions(questions){
	return{
		type: RECEIVE_QUESTIONS,
		questions,
	}
}



