import {  ADD_QUESTION, ADD_ANSWER, RECEIVE_QUESTIONS } from "../actions/qa";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question
      }
    case ADD_ANSWER:
      return {
        ...state,
        [action.questionId]: {
          ...state[action.questionId],
          [action.option]: {
            ...state[action.questionId][action.option],
            votes: [...state[action.questionId][action.option].votes, action.authedUser]
          }
        }
      }
    default:
      return state;
  }
}
