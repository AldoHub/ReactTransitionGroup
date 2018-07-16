import React, { Component } from 'react';

//this is the imageCOmponent
//each image is a "component" as I said before
class ImageComponent extends Component {
  constructor(props){
    super(props);
    this.state= {
      //here we are getting the props
      //just setting them to the state
      // but you can use props which is better
      //since they are not affecting the state
       //would call them using props.propertypassed
     imageSrc: props.src,
    imageId: props.imageId
    }
  }

 
  render() {
    //in fact I am passing the onClick event, and managing it here
    //when the image is clicked it has the event
    return (
      <img id={this.state.imageId} onClick={this.props.onClick} className="imageComponent" src={this.state.imageSrc} />     
    );
  }
}

export default ImageComponent;
