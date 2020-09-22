import React from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import {AppBar, TextField, RaisedButton} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import * as movieActions from './movie-browser.actions';
import * as movieHelpers from './movie-browser.helpers';
import MovieList from './movie-list/movie-list.component';
import * as scrollHelpers from '../common/scroll.helpers';
import MovieModal from './movie-modal/movie-modal.container';
import jsonData from '../../allData.json'

class MovieBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      currentMovies: [],
      selectMovieClass: 0,
    };
    // Binds the handleScroll to this class (MovieBrowser)
    // which provides access to MovieBrowser's props
    // Note: You don't have to do this if you call a method
    // directly from a lifecycle method
    this.handleScroll = this.handleScroll.bind(this);
    this.jsonData = JSON.parse(jsonData);

  }

  componentDidMount() {
    window.onscroll = this.handleScroll;
    // this.props.getTopMovies(this.state.currentPage);
    this.setState({selectMovieClass:0})

  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const {topMovies} = this.props;
    if (!topMovies.isLoading) {
      let percentageScrolled = scrollHelpers.getPercentageScrolledDown(window);
      if (percentageScrolled > .8) {
        const nextPage = this.state.currentPage + 1;
        this.props.getTopMovies(nextPage);
        this.setState({currentPage: nextPage});
      }
    }
  }

  setMovieClass = (classIndex) => {
    this.setState({selectMovieClass: classIndex})
  };

  render() {
    const {topMovies} = this.props;
    // const movies = movieHelpers.getMoviesList(topMovies.response);

    return (
      <div>
        <AppBar style={{ background: '#750000', height: 50, alignItems:'center'}}
                title={<div style={{fontSize: '2vw' }}> YOKU </div>}
        >

          <div style={{display: 'flex',justifyContent:'center', alignItems:'center'}}>
            <FlatButton style={styles.navButton} variant="contained" color="secondary"
                        onClick={()=> {this.setMovieClass(0)}}
            >
              热门
            </FlatButton>
            <FlatButton style={styles.navButton} variant="contained" color="secondary"
                        onClick={()=> {this.setMovieClass(1)}}
            >
              日本AV
            </FlatButton>
            <FlatButton style={styles.navButton} variant="contained" color="secondary"
                        onClick={()=> {this.setMovieClass(2)}}
            >
              欧美AV
            </FlatButton>
          </div>
        </AppBar>

        <Grid>
          <Row>
          </Row>
          <Row>
            <MovieList movies={this.jsonData[this.state.selectMovieClass]} isLoading={topMovies.isLoading}/>
          </Row>
        </Grid>
      </div>
    );
  }
}

const styles= {
  navButton: {
    color: 'white',
    // fontSize: '1.5vw'
  }
}
export default connect(
  // Map nodes in our state to a properties of our component
  (state) => ({
    topMovies: state.movieBrowser.topMovies
  }),
  // Map action creators to properties of our component
  {...movieActions}
)(MovieBrowser);
