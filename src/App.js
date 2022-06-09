import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './pages/about';
import AddWork from './components/AddWork';
import Contact from './pages/contact';
import SignUp from './pages/signup';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchBar from './components/SearchBar';
import Worklist from './components/Worklist';
import axios from './api/axios';



class App extends React.Component {
  state = {
    works: [],
    searchQuery: "",
  };
  //GETWORK
  async componentDidMount() {
    const response = await axios.get(
      "https://localhost:44323/Tbl_G%C3%BCnl%C3%BCk_i%C5%9F/"
    );
    console.log(response);
    this.setState({ works: response.data });
  }
  //DELETEWORK
  deleteWork = async (work) => {
    axios.delete("https://localhost:44323/Tbl_G%C3%BCnl%C3%BCk_i%C5%9F/");
    const newWorklist = this.state.works.filter((m) => m.iş_ID !== work.iş_ID);
    this.setState((state) => ({
      works: newWorklist,
    }));
  };
  //SEARCHWORK
  searchWork = (event) => {
    this.setState({ searchQuery: event.target.value });
  };
  //ADDWORK
  addWork = async (work) => {
    await axios.post(
      "https://localhost:44323/Tbl_G%C3%BCnl%C3%BCk_i%C5%9F/",
      work
    );
    this.setState((state) => ({
      works: state.works.concat([work]),
    }));

    this.getWorks();
  };

  render() {
    let filteredWorks = this.state.works.filter((u) => {
      return (
        u.Konum.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !==
        -1
      );
    });

    return (

      <Router>
       
          <Navbar />
          
          <Switch>
          <Route
              path="/"
              exact
              render={() => (
                <React.Fragment>
                  <div className="row">
                    <div className="col-lg-12">
                      <SearchBar searchWorkProp={this.searchWork} />
                    </div>
                  </div>

                  <Worklist
                    works={filteredWorks}
                    deleteWorkProp={this.deleteWork}
                  />
                </React.Fragment>
              )}
            ></Route>
         
            <Route path="/Add" component={AddWork} />
            <Route path='/' exact component={Worklist} />
            <Route path='/contact-us' component={Contact} />
             <Route path='/sign-up' component={SignUp} />
             <Route path='/Login' component={Login} />
             <Route path='/Register' component={Register} />
             <Route path='/about' component={About} />
           
        <main className="App">
          <Register />
           <Login />
          </main>


          </Switch>
         
      </Router>

    );

              }
             
              
            }




  
export default App;