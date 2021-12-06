import React, {Component, Fragment} from 'react'
import './App.css'
import Login from './components/login'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import DropdownExampleSelection from './components/login'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from './actions/shared'
import Nav from './components/nav'
import Add from './components/addq'
import ERR from './components/404'
import Signout from './components/signout'
import QuestionSingle from './components/questionSingle'
import Question from './components/question'
import Questions from './components/questions'
import Leaderboard from './components/leaderboard'
class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
render(){
  return(
      <Router>
      <Fragment>
      <LoadingBar style={{backgroundColor:'#00b5ad', width:'100%', position:'absolute', zIndex:'9999', top:'0'}}/>
<Nav/>
<Switch>
<Route exact path='/login' component={Login}/>
<PrivateRoute exact path="/" component={Questions} />
<PrivateRoute exact path="/questions/:question_id" component={QuestionSingle} />
<PrivateRoute exact path="/leaderboard" component={Leaderboard} />
<PrivateRoute exact path="/add" component={Add} />
<Route exact path="/logout" component={Signout} />
<Route component={ERR} />
</Switch>
    </Fragment>
    </Router>
    )
}
}

const PrivateRoute = connect(mapStateToProps)(
  ({component:Component, authedUser, ...rest})=>(
      <Route {...rest} render={props => 
        authedUser !== null ? (<Component {...props}/>) : (<Redirect push to='/login'/>)} />
    )
)
function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}




export default connect(mapStateToProps)(App)