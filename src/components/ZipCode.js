import React, {Component} from 'react';
import "./zipcode.css"
import axios from "axios";
import ReactDOM from 'react-dom';

/*
    This class allows users to get a various data about the zip code
    using ctp-zip-api
*/
class ZipCode extends Component{
    constructor(props)
    {
        super(props)
        this.state = {
            zip: "",
            data: [],            
        }  
        
        this.handleChange = this.handleChange.bind(this)
    }
    
    componentDidMount(){
        axios.get("http://ctp-zip-api.herokuapp.com/zip/" + this.state.zip)
        .then((response) =>{            
            let result =response.data
            this.setState({data:result}); //store the fetched data 
            //console.log(result)  
            this.printAllQueries(); //filter and print query results
        })
        .catch((err) => console.log(err)); //send an error message to the console                
    
    }

    handleChange = (event) =>{

        this.setState({
            [event.target.name]: event.target.value
        })



    }


    printAllQueries = () => {        
       
        let output = []; //output collector

        //map and select query results
        output = this.state.data.map(item => 
        <div className="query-result">
            <h3>
                {item.City}, {item.State}
            </h3>         
            <div className="query-data-box">
                <div className="query-data">
                    <li>City: {item.City}</li>
                    <li>State: {item.State}</li>
                    <li>Location: ({item.Lat}, {item.Long})</li>
                    <li>Population (estimated): {item.EstimatedPopulation}</li>
                    <li>Total Wages: {item.TotalWages}</li>
                </div>
            </div>         
        </div>)       
        
        //render query results
        ReactDOM.render(
            output,
            document.getElementsByClassName("results-output")[0]
        );
    }       

    //main output render
    render(){
        return (            
            <div className="main">
                    <div className="prompt-line-box">

                        <h2>Zip Code:</h2>

                        <input 
                        className="prompt-line" 
                        type="text" 
                        onChange={(event) => this.setState({ zip: event.target.value })}
                        onKeyPress={(event) => {
                            if(event.key === "Enter") 
                            {
                                this.componentDidMount();
                            }
                        }}
                        placeholder= {"ex: 10103"}
                        ></input>  

                    </div>   

                    <button
                        className="button-find"
                        onClick={() => {
                            this.componentDidMount();                        
                        }}
                        >
                        Find
                    </button>   

                    <div className="container">
                        <ul className="results-output"></ul> 
                    </div>                    
            </div>                        
            
        );            
      
    }  
}

export default ZipCode;