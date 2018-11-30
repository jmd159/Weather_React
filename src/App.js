import React from 'react';
import Titles from "./Components/Titles"
import Form from "./Components/Form"
import Weather from "./Components/Weather"

const API_KEY = "d170fdd6e24cb4867629e3b34063c97c";

class App extends React.Component {

  state = {       //intitial state of the object only changed when user hits buttons

    temperature: undefined,

    city: undefined,

    country: undefined,

    humidity: undefined,

    description: undefined,

    error: undefined

  }


  getWeather = async (e) => {

    e.preventDefault(); //prevents default behavior of component when button is hit from form file

    const zip = e.target.elements.zip.value;



    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${API_KEY}&units=imperial`);

    const data = await api_call.json(); //converts the data receiving from api to json

    if(zip){
      console.log(data);

      this.setState({temperature: data.main.temp,
                      city: data.name,
                      country: data.sys.country,
                      humidity: data.main.humidity,
                      description: data.weather[0].description,
                      error: ""});

    }else{
      this.setState({temperature: undefined,
                      city: undefined,
                      country: undefined,
                      humidity: undefined,
                      description: undefined,
                      error: "Please enter a Zip code to get weather"});
    }
  }

  render() {

    return(

      <div>

        <div className="wrapper">
              <div className="main">
                <div className="container">
                  <div className="row">
                    <div className="col-xs-5 title-container">
                    <Titles/>
                    </div>
                    <div className="col-xs-7 form-container">
                    <Form getWeather={this.getWeather}/>
                    <Weather temperature={this.state.temperature}
                              city={this.state.city}
                              country={this.state.country}
                              humidity={this.state.humidity}
                              description={this.state.description}
                              error={this.state.error}
                              />
                    </div>
                  </div>
                </div>
              </div>
            </div>


      </div>

    );
  }

};


export default App;
