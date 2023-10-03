import React from "react";

import './App.css';
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import Rec from "./components/Recognition";
import Imagelinkforum from "./components/Imagelinkform";
import Rank from "./components/Rank";
import SignIn from "./components/SignIn";

import ParticlesBg from 'particles-bg';
import { OrbitSpace } from 'orbit-space';

const defaultState = {
  input: "",
      bounding_box: "",
      concept: "",
      route: "signin",
      isSignedIn: false,
      user:{
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: ""
      }
}
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      bounding_box: "",
      concept: "",
      route: "signin",
      isSignedIn: false,
      user:{
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: ""
      }
    }
  }

  loadUser=(data)=>{
    this.setState({user:{
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onDetect = () => {
    fetch("https://image-detection-backend.onrender.com/ApiCall",{
      method:"post",
      headers:{"Content-Type":"application/json"},
      body :JSON.stringify({
          input : this.state.input
      })
    }).then(response => response.json())
      .then(result => {
        fetch("https://image-detection-backend.onrender.com/images",{
            method:"put",
            headers:{"Content-Type":"application/json"},
            body :JSON.stringify({
                id : this.state.user.id
            })
        }).then(response=>response.json())
        .then(count=>{
          // NOTE :::
          this.setState(Object.assign(this.state.user, {entries:Number(count)}));
          // here we have to use Object.assign as it changes all instances of that object 
        }).catch(error => {
          console.log("Cannot find");
        });

        let inputimg = document.getElementsByClassName("inputimg")[0];
        let width = Number(inputimg.width);
        let height = Number(inputimg.height);

        let rconcept = result.outputs[0].data.regions[0].data.concepts[0].name;
        let box = result.outputs[0].data.regions[0].region_info.bounding_box;

        box.left_col = box.left_col * width;
        box.left_col = width - box.right_col * width;
        box.top_row = box.top_row * height;
        box.bottom_row = height - box.bottom_row * height;

        this.setState({ bounding_box: box });
        this.setState({ concept: rconcept + "-->" });
      })
      .catch(error => {
        this.setState({bounding_box:"error"});
    })
    .catch(error => {
      console.log("ApiCall Error");
    });
  }

  onChangeRoute = (route) => {
    this.setState({ route: route });
    if (route === "signin")
      this.setState(defaultState);
    else {
      this.setState({ isSignedIn: true })
    }
  }

  flip = () => {
    let log = document.getElementsByClassName("log")[0];
    let flip = document.getElementsByClassName("flip")[0];
    flip.classList.toggle("flippable");
    log.classList.toggle("flippable");
  }


  render() {
    return (
      <div className="App">
        <OrbitSpace>
          {
            this.state.isSignedIn === true
              ? <Navigation changeRoute={this.onChangeRoute} isSignedIn={this.state.isSignedIn}></Navigation>
              : ""
          }
          <Logo />
          {(this.state.route === "signin")
            ? <SignIn changeRoute={this.onChangeRoute} loadUser={this.loadUser} flip={this.flip} />
            : <div>
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <Imagelinkforum onInputChange={this.onInputChange} onDetect={this.onDetect} />
              {
                (this.state.bounding_box === "error"
                  ? "URL is too long Please try another url"
                  : <Rec imglink={this.state.input} boxpos={this.state.bounding_box} concept={this.state.concept} />)
              }
            </div>
          }

        </OrbitSpace>
        <ParticlesBg color="#ffffff" type="cobweb" bg={true} />
      </div>
    )

  }
}
export default App;

