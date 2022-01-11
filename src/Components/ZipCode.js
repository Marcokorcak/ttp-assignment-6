import React, {Component} from 'react';
import axios from 'axios';
import './ZipCode.css';

class CodeZip extends Component {
    constructor() {
        super()
        this.state = {
            zip: '',
            data: []
        }
    }

    handleChange = (event) => {
        this.setState({
            zip: event.target.value
        });
    }

    componentDidMount = () => {
        axios.get(`http://ctp-zip-api.herokuapp.com/zip/${this.state.zip}`)
            .then(response => {
                const newInfo = response.data;
                this.setState({data: newInfo});
            })
            .catch(err => console.log(err));
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevState.zip !== this.state.zip) {
            this.componentDidMount();
        }
    }

    render() {
        return (
            <div>
                <form>
                    Enter a Zip Code: <input type="text" name="zip" placeholder="Zip Code" onChange={this.handleChange}></input>
                </form>
                <br></br>
                {this.state.data.map(data =>
                    <div key={data.RecordNumber} className="zip">
                        <h2 id="cityHeader">{data.City}</h2> 
                        <ul id="zipCodeList">
                            <li>State: {data.State}</li>
                            <li>Location: ({data.Lat}, {data.Long})</li>
                        </ul>
                    </div>
                )} 
            </div>
        )
    }
}

export default CodeZip