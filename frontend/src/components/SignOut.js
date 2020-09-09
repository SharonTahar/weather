import React from "react"
import {
  withRouter
} from "react-router-dom";


// const fakeAuth =  {
//     isAuthenticated: true,
//     authneticate(cb) {
//       this.isAuthenticated = true
//       setTimeout(cb, 100)
//     },
//     signout(cb) {
//       this.isAuthenticated = false
//       setTimeout(cb, 100)
//     }
//   }


const SignOut = withRouter(({ history }) => (
    isAuthenticated
      ? <p>
          Welcome! <button onClick={() => {
            fakeAuth.signout(() => history.push('/'))
          }}>Sign out</button>
        </p>
      : <p>You are not logged in.</p>
  ))

export default SignOut;