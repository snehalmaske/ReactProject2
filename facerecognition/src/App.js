import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
 apiKey: 'feb5d30072e941d19b8ef2a992929948'
});


const particlesOptions ={
	particles: {
        number : {
        	value: 50,
        	density:{
        		enable:true,
        		value_area: 800
        	}

        }
            		
    }
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '' ,
			imageUrl: '',
			route: 'signin',
			isSignedIn: false
		}
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	onButtonSubmit = () => {
		this.setState({imageUrl: this.state.input});
		app.models.predict(
			Clarifai.FACE_DETECT_MODEL, 
			this.state.input)
		.then(
    function(response) {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      // there was an error
    }
  );
}

onRouteChange = (route) => {
	if(route === 'signout') {
		this.setState({isSignedIn: false})
	} else if (route === 'home') {
		this.setState({isSignedIn: true})
	}
	this.setState({route: route});
}

render() {
	const {isSignedIn, imageUrl, route} = this.state;
  return (
    <div className="App">
    <Particles className= 'particles'
              params={particlesOptions}
              
    />

    <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
    { route === 'home'
    	? <div>
    	 <Logo />
         <ImageLinkForm 
         onInputChange = {this.onInputChange} 
         onButtonSubmit = {this.onButtonSubmit}/>
    <FaceRecognition imageUrl={imageUrl} />
    </div>
    	: (
    		route ==='signin'
    		? <Signin onRouteChange={this.onRouteChange} />
    		: <Register onRouteChange={this.onRouteChange} />
    		)
    
    }
    </div>
  );
	};
}

export default App;
