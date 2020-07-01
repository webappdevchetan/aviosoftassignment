import React, { Component } from 'react';
import Loader from '../subcomponent/Loader';
import { getUrl } from '../services/network/urls';
import Image from '../assets/images/download.svg'
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
class ProductDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            product: []
        }
    }
    async componentDidMount() {
        let urlsArray = []
        if (this.props.match.params.id !== undefined) {
            urlsArray.push(fetch(getUrl("product_detail") + '/' + this.props.match.params.id))
        }
        const promises = Promise.all(urlsArray);
        promises
            .then((results) =>
                Promise.all(results.map(r => r.json()))
            )
            .then((results) => {
                this.setState({
                    loading: false,
                    product: results[0],
                })
            })
    }

    render() {
        return (
            <Container>
                {this.state.loading && <Loader />}
                <Row>
                    <Col lg="12" className="mb-3" >
                        <Link to="/" className="btn btn-primary"> Go back</Link>
                    </Col>
                    <Col sm="3" className=" product_img">
                        <img src={Image} className="img-responsive" alt="title" />
                    </Col>
                    <Col sm="9" className="ml-6 product_content">
                        <h4>Product : <span>{this.state.product.name}</span></h4>
                        <h3 className="cost"> {this.state.product.price}</h3>
                        <p>{this.state.product.description}</p>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ProductDetailComponent;