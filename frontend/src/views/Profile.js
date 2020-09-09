import React from "react";
import {cities, forcast, urls, icons} from '../components/dummyData'
import { APIKEY } from '../redux/constants'
// import ForcastCard from "components/ForcastCard";

export default class Profile extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      citykey: [],
      citylist: [],
      current: []
  }
}

//Fetching all the data from the database + sends to the server the user.id to check
componentDidMount(){
  const user = this.props.user
    fetch("http://localhost:9000/getAllCities/" + user.user[0].id, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify()
    })
    .then(res => res.json())
    .then(data => { 
      console.log(data);
      this.setState({citykey:data})
    })
    .catch(err => {
      console.log(err);
    })
  }


  favoriteCities = () => {
    const cityArr = this.state.citykey;
    let requests = cityArr.map(item => 
      fetch(`http://dataservice.accuweather.com/locations/v1/${item.city_key}?apikey=${APIKEY}`
      ));

    Promise.all(requests)
      .then(responses => {
        return responses;
      })
      // map array of responses into an array of response.json() to read their content
      .then(responses => 
        Promise.all(responses.map(r => r.json())
        ))
      // all JSON answers are parsed: "citylist" is the array of them
      .then(cityData => 
          this.setState({citylist:cityData}
           ))
          const favoriteCurrent = () => {
            // console.log('citykey',this.state.citykey[0].city_key)
            let requestsCurrent = cityArr.map(item => 
              fetch(`http://dataservice.accuweather.com/currentconditions/v1/${item.city_key}?apikey=${APIKEY}`
            ));
            Promise.all(requestsCurrent)
                .then(responses => {
                return responses;
              })
              .then(responses => 
                Promise.all(responses.map(r => r.json())
              ))
              .then(cityData => 
                  this.setState({current:cityData})
                )
            }
            favoriteCurrent()
    }

          

    renderCitylist = () => {
      const {citylist} = this.state;
      return (
          <ul>
          {
              citylist.map(item => {
                  return <div>
                            <li>
                                {item.LocalizedName} {item.Country.LocalizedName}
                            </li>
                          </div>     
              })
          }
          </ul>
      )
    }

    renderCurrent = () => {
      const {current} = this.state;
      return (
          <ul>
          {
              current.map(item => {
                  return <div>
                            <li>
                                {item.WeatherText}
                            </li>
                            <img src={icons[item.WeatherIcon]} />
                          </div>     
              })
          }
          </ul>
      )
    }


//DO A MAP!!! LIKE WITH THE FETCH
    delFavorites = () => {
      console.log(this.state.citykey[0].city_key);
      // const keys = [],
      // const i = 0,
      // for (i in citykey)
      
      // fetch("http://localhost:9000/delFavorites" +citykey[0].city_key, {
      //   method: 'POST',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify()
      // })
      // .then(response => response.json())
    }


  render() {
    console.log('citylist:' , this.state.citylist)
    console.log('current:' , this.state.current)
    const { citylist } = this.state
    let count = 0;
    let i = 0
    for (i in citylist) {
      count = count + 1 
    }
    return (
      <>
        <main className="profile-page">
          <section className="relative block" style={{ height: "500px" }}>
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')"
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
              style={{ height: "70px", transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-gray-300 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </section>
          <section className="relative py-16 bg-gray-300">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <img
                          alt="..."
                          src={require("assets/img/team-3-800x800.jpg")}
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                          style={{ maxWidth: "150px" }}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <button
                          className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                          onClick={this.favoriteCities}
                        >
                          Show Favorites
                        </button>
                        <br></br>
                        <button
                          className="bg-blue-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                          onClick={this.delFavorites}
                        >
                          clear Favorites
                        </button>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          {count}
                          </span>
                          <span className="text-sm text-gray-500">Favorite locations</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                      Jenna Stones
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                      Los Angeles, California
                    </div>
                  </div>
                  <div>
                      <ul>
                        <li>
                            {this.renderCitylist()}
                            {this.renderCurrent()}
                        </li>
                      </ul>
                    </div>
                  <div className="mt-10 py-10 border-t border-gray-300 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-gray-800">
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }
  }