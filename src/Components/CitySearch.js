import React, {Component} from 'react';
import axios from 'axios';
import './CitySearch.css';

class SearchCity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            city: '',
            data: []
        }
    }

    handleChange = (event) => {
        this.setState({
            city: event.target.value
        });
    }

    componentDidMount = () => {
        axios.get(`http://ctp-zip-api.herokuapp.com/city/${this.state.city.toUpperCase()}`)
            .then(response => {
                const newInfo = response.data;
                this.setState({data: newInfo});
            })
            .catch(err => console.log("could not be found (test)"));
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevState.city !== this.state.city) {
            this.componentDidMount();
        }
    }

    render() {
        return ( 
            <div>
                <form>
                    Enter a City: <input type="text" name="city" placeholder="City name" onChange={this.handleChange}></input>
                </form>
                <br></br>
                {this.state.data.map(data =>
                    <div key={data.RecordNumber} className="city">
                        <ul>
                            <li>{data}</li>
                        </ul>
                    </div>
                )}
            </div>
        )
    }
}

export default SearchCity