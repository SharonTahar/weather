import React from 'react';
import './dropdown.css'
import { APIKEY } from '../redux/constants'
import Daycard from './Daycard';
import {cities, forcast} from './dummyData'


class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            suggestions: [],
            key: '',
            localizedName: ''
        }
    }


    onTextChange = (e) => {
        this.setState({suggestions:cities});
        // const value = e.target.value;
        // // const {city} = this.state
        // if(value.length > 0) {
        //     fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${APIKEY}&q=${value}`)
        //     .then(response => response.json())
        //     .then(key => {
        //         console.log(JSON.stringify(key));
        //         this.setState({suggestions:key});
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
        // }
    }

    renderSuggestion = (props) => {
        const {suggestions} = this.state;
        return (
            <ul>
            {
                suggestions.map(item => {
                    return <div>
                            <li Key={item.id}
                            onClick={()=> this.onTextClicked(item.Key)}>
                                {item.LocalizedName} {item.Country.LocalizedName}
                                <br></br>
                            </li>
                            <li onClick={()=> this.sendFavorites(item.Key)} 
                                className="lg:hidden inline-block ml-2 fas fa-heart">Add</li>
                            </div>
                            
                })
            }
            </ul>
        )
    }

    onTextClicked = (key) => {
        this.setState({fiveDaysData:forcast})
        // fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${APIKEY}&metric=true`)
        // .then(response => response.json())
        // .then(data => {
        //     console.log(JSON.stringify(data));
        //     this.setState({fiveDaysData:data});
        // })
        // .catch(err => {
        //     console.log(err);
        // })
    }

    // onBtnSubmit = (key) => {
    //     saveFavorites(key);
    // }


    sendFavorites = (key) => {
        let obj = {};
        obj.user = this.props.user;
        obj.key = key;
        console.log(obj);
        fetch("http://localhost:9000/saveFavorites", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(obj)
          })
          .then(response => response.json())
    }


    render() {
        const { key, fiveDaysData } = this.state;
        // console.log('forecast:', fiveDaysData);
        // console.log('stext', searchText);
        return (
            <div className="relative flex w-full flex-wrap items-stretch mb-3">
            <input type="text" 
                placeholder="Search" 
                value={key}
                onChange={this.onTextChange}
                className="px-2 py-1 placeholder-gray-400 text-gray-700 
                relative bg-white bg-white rounded text-sm shadow 
                outline-none focus:outline-none focus:shadow-outline w-full pr-10"/>
                <span className="z-10 h-full leading-snug font-normal absolute text-center 
                text-gray-400 absolute bg-transparent rounded text-base items-center 
                justify-center w-8 right-0 pr-2 py-1">
              <i className="fas fa-user"></i>
            </span>
                <div className="relative">
                    <div className="dropdown" data-aos="fade-up" >
                        {this.renderSuggestion()}
                    </div>
                </div>
                <div>
                    <Daycard data={fiveDaysData?fiveDaysData.DailyForecasts[0]:{}} />
                </div>
                <div>
                    {
                        fiveDaysData?
                            fiveDaysData.DailyForecasts.map(item =>{
                                return <Daycard data={item} />
                            }): ''
                    }
                </div>
          </div>
        )
    }
}

export default Search;