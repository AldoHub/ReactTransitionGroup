import React, { Component } from 'react';
import Axios from 'axios'; //getting axios for an api call
import ImageComponent from "./components/imageComponent"; // I am using a component 
//which will be animated

//this is a simple demo using the ReactTransitionGroup V2


//in order to use the transition group
//we need to import these 2 modules
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

class App extends Component {

  constructor(){
    super();
    //will add the array to the state of the app
    this.state={
      images : [],
     
    }
    
  }
 
  //api call
  //I am using splashbase to get some data
  //images in this case to append to the component
  //every image is a "component"
  splashBaseCall = () =>{
  
    //use axios to get the call and response
   Axios.get("http://www.splashbase.co/api/v1/images/latest")
   .then((response)=>{
     //which comes in the next structure
    let imgs =  response.data.images;
    //and set the imgs response, which is an array
    //to the state of the app
    this.setState({images: imgs}); 
    //lets console the response   
    console.log(this.state.images);
    //here we have the images in the state
   });
  }


 
  //removing the image
  remove = (i) =>{
    //finally we use this function to remove the image clicked
    const imagesArray = this.state.images.slice(); //create a new array
    imagesArray.splice(i, 1); //remove the image on that index
    console.log(i); //console the index, because is nice to know
    //set the result to the images array in the state
    this.setState({images: imagesArray});

  }
 
  // I think thats all, just wawnted to show you how
  //to manage the animation on a Component, not on single elements
  //like the imageComponent
  
  render() {
 {/* This is the render   */}
    return (
      <div className="container">
      <div>
      <h1>React Transition Group</h1>
        <p>Click the button to get a set of images</p>
        {/* managing the click event for the call */}
        <button onClick={this.splashBaseCall}>Get Images</button>
      </div>
        <div className="imagesContainer">
       {/* forgot you need to wrap everything in a TransitionGroup tag 
      which by default renders a <div> */}
       <TransitionGroup className="images-list">
        {/* Here I am looping through the state array
            in order to get the images data  */}
        {this.state.images.map((image, i)=>{
        
         return(
          
            <CSSTransition key={image.id} timeout={500} classNames="fade">
            {/* We wrap the component we want to animate
                inside the CSSTransition, we must give a unique Key, a timeout for the animation
                and the name we want for the animation in the CSS
                we pass the proerties as props, and manage the click event in the component itself 
                the timeout should match the CSS transition time
                */}
            <ImageComponent imageId={image.id} src={image.large_url} onClick={() => this.remove(i)} />
            
            {/* this is a simple element, the img element passing all the properties into it
                but you might need to do more, to use a component, which is the case for the above
            <img id={image.id} className="imageComponent" alt={image.url} onClick={() => this.remove(i)} src={image.large_url} />           
            */}
            </CSSTransition>
           );
         
        })}
        </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default App;
