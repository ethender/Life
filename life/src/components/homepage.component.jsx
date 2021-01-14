import React from 'react';
import './homepage.stylesheet.scss';
import { Switch ,Route, Link } from 'react-router-dom';
import Counter from './counter.component';

//Logos
import meditation from './assets/lifelogo.png';
import sprints from './assets/sprints.svg';
import money from './assets/money.svg';

//Bootstrap
import { Container, Row, Col, Button } from 'react-bootstrap';
//Documentation
//https://react-bootstrap.github.io/components/buttons/
class Home extends React.Component{


    constructor(props){
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);

        /*
            Redirects
        */
        this.redirectCounter = this.redirectCounter.bind(this);
        this.redirectSprint = this.redirectSprint.bind(this);
    }

    redirectCounter(){
        console.log(window.location.origin);
        this.props.history.push("/counter");
    }

    redirectSprint(){
        this.props.history.push("/sprint");
    }

    componentDidMount(){
        
    }

    render(){
        return (
            
            <Container>
                <Row>
                    <h1 class="header">Life</h1>
                </Row>
                <Row>
                    <Col>
                        <h3>Spritual</h3>
                    </Col>
                    <Col>
                        <Button variant="light" onClick={this.redirectCounter}>
                            <img class="logo" src={meditation} alt="counter" />
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Sprint-Management</h3>
                    </Col>
                    <Col>
                        <Button variant="light" onClick={this.redirectSprint}>
                            <img class="logo" src={sprints} alt="sprint" />
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Money-Management</h3>
                    </Col>
                    <Col>
                        <Button variant="light">
                            <img class="logo" src={money} alt="Money" />
                        </Button>
                    </Col>
                </Row>
            </Container>
             
        );
    }

}

export default Home;