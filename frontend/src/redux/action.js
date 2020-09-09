import { TEXT, DAYSTEXT, CITY, APIKEY, AUTHENTICATE } from './constants'


export const authentication = (email, password) => {
    // console.log('setText', text);
    return (dispatch) => {
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
                if(data.user) {
                dispatch({type:AUTHENTICATE, payload:data})
              }
              // console.log(data);
            }
          })
          .catch(err => {
            console.log('error:', err);
          })
    }
}










export const getText = (text) => {
    console.log(text);
    return {
        type: TEXT,
        payload: text
    }
}


// export const setCity = (city) => {
//     // console.log('setText', text);
//     return (dispatch) => {
//         fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${APIKEY}&q=${city}`)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             dispatch({type:CITY,payload:data})
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     }
// }

export const setText = (text) => {
    // console.log('setText', text);
    return (dispatch) => {
        fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${text}?apikey=${APIKEY}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            dispatch({type:DAYSTEXT,payload:data})
        })
        .catch(err => {
            console.log(err);
        })
    }
}




