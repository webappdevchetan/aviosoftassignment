import React, { Component } from 'react';
import Loader from '../subcomponent/Loader';
import { getUrl } from '../services/network/urls';
import { Container, Row, Col, Form, Card } from "react-bootstrap";
import Image from '../assets/images/download.svg'
import { Link } from "react-router-dom";
class ProductListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            allProduct: [],
            category: [],
            selectedCategory : 0,
            product: []
        }
    }
    async componentDidMount() {
        let urlsArray = [
            fetch(getUrl("product_list")),
            fetch(getUrl("category")),
        ]
        const promises = Promise.all(urlsArray);
        promises
            .then((results) =>
                Promise.all(results.map(r => r.json()))
            )
            .then((results) => {
                this.setState({
                    allProduct: results[0],
                    category: results[1],
                }, () => {
                    this.setState({
                        loading: false,
                        product: this.state.allProduct.filter((e) => e.categoryId === this.state.selectedCategory)
                    })
                })
            })
    }

    handleCategorySelect = (e) => {
        let category = e.target.value;
        let product = this.state.allProduct.filter((e) => Number(e.categoryId) === Number(category));
        this.setState({
            selectedCategory: category,
            product: product
        });
    }
    render() {
        return (
            <React.Fragment>
                {this.state.loading && <Loader />}
                <Container>
                    <Row >
                        <Col>
                            <Form.Group as={Row} className="justify-content-md-center">
                                <Col lg="2" md="3">
                                    <Form.Label> Product Category</Form.Label>
                                </Col>

                                <Col lg="4" md="4">
                                    <Form.Control as="select" onChange={this.handleCategorySelect} >
                                        {this.state.category.map((category) => <option key={category.id} value={category.id} >{category.name !== undefined ? category.name : 'Category ID ' + category.id}</option>)}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    {this.state.product.length > 0 ? <Row>
                        {this.state.product.map((singleproduct) => <Col sm="4" key={"product_" + singleproduct.id} className="mt-4">
                            
                            <Card>
                                <Card.Img variant="top" className="image-spacing" src={Image} />
                                <Card.Body>
                                    <Link to={`/detail/${singleproduct.id}`}>
                                        <Card.Title className="justify-content-md-center">{singleproduct.name}</Card.Title>
                                    </Link>
                                    
                                    <label className="col-sm-12 justify-content-md-center" >{singleproduct.model}</label>
                                    <label className="col-sm-12 justify-content-md-center" >{singleproduct.price}</label>
                                </Card.Body>
                            </Card>
                            
                        </Col>
                        )}
                        
                    </Row>
                         : <Row>
                            <Col>Product Not found for this category</Col>
                        </Row>}
                        
                </Container>
            </React.Fragment>
        )
    }
}

export default ProductListComponent;