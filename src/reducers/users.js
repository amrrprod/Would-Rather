import { USERS_RECEIVE, QUESTION_ADD, ANSWER } from '../actions/users'

export default function users (state = {}, action) {
    switch(action.type) {
        case USERS_RECEIVE :
            return {
                ...state,
                ...action.users
            }
        case QUESTION_ADD :
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    questions: state[action.authedUser].questions.concat([action.questionId])
                }
            }
        case ANSWER :
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.questionId]: action.option
                    }
                }
            }
        default:
            return state
    }
}
