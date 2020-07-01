import React, { Component } from 'react';
import { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/style.css";
import Loader from './subcomponent/Loader'
const ProductDetail = lazy(() => import('./component/ProductDetailComponent'));
const ProductList = lazy(() => import('./component/ProductListComponent'));
class App extends Component {
  
  render() {
    return (
      <div className="App" >
        <section className="main-area-root">
          <Switch>
            <Suspense fallback={<Loader />}>
              <Route exact path="/" component={ProductList} />
              <Route exact path="/detail/:id" component={ProductDetail} />
            </Suspense>
          </Switch>
        </section>
        
      </div>
    );
  }

}


export default App;
