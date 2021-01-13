import React, {Component} from 'react';
import './App.css';
import ZipCode from './components/ZipCode.js';

class App extends Component{
  render(){
    return (
      <>
          <h1 className="App-header"> Zip Code Search</h1>
          <ZipCode />
      </>
        
      );
  }  
}

export default App;