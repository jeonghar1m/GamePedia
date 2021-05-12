import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './components/Pages/MainPage/MainPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'main'
    }
  }
  getContent() {
    var _section = null;
    if(this.state.page === 'main') {
      _section = <MainPage></MainPage>
    }
    
    return _section;
  }
  render() {
    return (
      <div className="App">
        <body>
          <header>
            <nav>
              <div class="inner">
                <span id="logo"><h1><a href="../Graduation-Project">MyMovieList</a></h1></span>
              </div>
              <hr></hr>
            </nav>
            {this.getContent()}
          </header>
        </body>
      </div>
    );
  }
}

export default App;