import React from 'react';
import './counter.stylesheet.scss';


class Counter extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            counter: 5,
            value:0
        }
        this.negative = this.negative.bind(this);
        this.positive = this.positive.bind(this);
        this.changeCounterValue = this.changeCounterValue.bind(this);
    }

    negative(){
        var updatedValue = this.state.value-this.state.counter;
        if(updatedValue < 0){
            this.setState({
                value: 0
            });
        }else{
            this.setState({
                value: updatedValue
            });
        }
    }

    positive(){
        
        var updatedValue = this.state.value+this.state.counter;
        this.setState({
            value: updatedValue
        });
    }

    changeCounterValue(e){
        console.log(e);
        var  updatedValue = parseInt(e.target.value);
        if(Number.isNaN(updatedValue) || updatedValue == undefined || updatedValue < 0){
            updatedValue = 5;
        }
        this.setState({
            counter: updatedValue
        });
    }



    render(){
        return (
            <div class='row'>
                <div class='col-md-12'>
                    <h1>Counter</h1>
                    
                <form>
                    <div class="form-group">
                        <button type="button" onClick={this.negative} class="btn btn-light" >-</button>
                        <input type="number" onChange={this.changeCounterValue} value={this.state.counter} min="0" max="1000" step="1"/>
                        <button type="button" onClick={this.positive} class="btn btn-light">+</button>
                    </div>
    
                </form>
                </div>
                <div class='col-md-12'>
                    <p>{this.state.value}</p>
                </div>
            </div>
            
            
        );
    }

}

export default Counter;