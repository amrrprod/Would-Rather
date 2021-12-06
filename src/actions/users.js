export const USERS_RECEIVE = 'USERS_RECEIVE'
export const QUESTION_ADD = 'QUESTION_ADD'
export const ANSWER = 'ANSWER'


export function usersReceive(users) {
	return{
		type:USERS_RECEIVE,
		users,
	}
}


export function questionAdd(authedUser, qid){
	return{
		type:QUESTION_ADD,
		authedUser,
		qid,
	}
}


export function answer(authedUser, qid, option){
	return{
		type: ANSWER,
		authedUser,
		qid,
		option
	}
}