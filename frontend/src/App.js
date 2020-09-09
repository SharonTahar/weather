import React from 'react';
import AOS from 'aos';
import {connect} from 'react-redux';
import {
  Link,
  Route,
  Redirect,
  Switch,
  useHistory
} from "react-router-dom"
import PrivateRoute from './components/PrivateRoute';
// import SignOut from './components/SignOut';

import Landing from 'views/Lading';
import Login from './views/Login';
import Signup from './views/Signup';
import Profile from 'views/Profile';
import Navbar from 'components/Navbar';
import ContentSection from 'components/ContentSection';
import { authentication } from './redux/action'


AOS.init();

class App extends React.Component {
  constructor(props){
    super(props); 
    this.state = {
      isAuthenticated: props.isAuthenticated,
      user: [],
      redirect: null
    }
  }


//signup method, sends data to backend to create a user
//authenticates and sets its state to true! 
  handleSubmit = (username, email, password) => {
    // const { username, email, password } = this.state
    console.log('handlesubmit:', username, email, password);
    fetch('http://localhost:9000/signup', {
      method:'POST',
      headers: {
        'content-type': 'application/json'
      },
      body:JSON.stringify({
        username,email,password
      })
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      if(data) {
        if(data.message) {
          console.log(data.message)
        }
        else if(data.user) {
          this.setState({user:data, redirect:'/', isAuthenticated: true})
        }
          
        console.log(data);
      }
    }
    )
    .catch(err => {
      console.log(err);
    })
  }

  //signin method to send the data to the server 
  ontextSubmit = (email, password) => {
    // const {loginA} = this.props
    // loginA(email, password)
    // console.log('ontextSubmit:', email, password);
    const { rememberMe } = this.props;
    fetch('http://localhost:9000/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body:JSON.stringify({
        email,password
      })
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      if(data) {
        if(data.message) {
          console.log(data.message)
        }
        else if(data.user) {
          this.setState({user:data, redirect:'/profile', isAuthenticated: true})
        }
        localStorage.setItem('rememberMe', rememberMe);
      }
    })
    .catch(err => {
      console.log('error:', err);
    })
  }

  componentDidMount() {
      const {user} = this.state
      if (user.length > 0) {
        this.setState({ isAuthenticated: true });
      }
    }

  render() {
    const { redirect, isAuthenticated } = this.state; 
    // const {isAuthenticatedA, userA } = this.props
    // console.log('isAuthenticatedA:', isAuthenticatedA, 'userA:' , userA );
    // console.log('authneticate:',isAuthenticated, redirect);
    return (
        <div>
          <Navbar />
          {/* <Route path='/logout' render={ () => <SignOut redirect={redirect} />} /> */}
          <Switch>
            <Route isAuthenticated={isAuthenticated} path='/' exact>
              <Landing user={this.state.user} />
              <ContentSection />
            </Route>
            <Route key='1' path='/login' render={ () => <Login redirect={redirect} 
              ontextSubmit={this.ontextSubmit} />} />
            <Route key='1' path='/signup' render={ () => <Signup redirect={redirect} 
              handleSubmit={this.handleSubmit} />} />
           <PrivateRoute isAuthenticated={isAuthenticated} path="/profile">
            <Profile user={this.state.user}/>
          </PrivateRoute>
          </Switch>
        </div>
    )
  }
}

//gets the state from the store (state is calling the stores state)
const mapStateToProps = (state) => {
  return {
  isAuthenticatedA: state.authenticateUser.isAuthenticated,
  userA: state.authenticateUser.user
  }
}

//updates state changes in the store 
const mapDispatchToProps = (dispatch) => {
  return {
    loginA: (email, password) => dispatch(authentication(email, password))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);



