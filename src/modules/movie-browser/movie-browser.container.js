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

class MovieBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      currentMovies: []
    };
    // Binds the handleScroll to this class (MovieBrowser)
    // which provides access to MovieBrowser's props
    // Note: You don't have to do this if you call a method
    // directly from a lifecycle method
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.onscroll = this.handleScroll;
    this.props.getTopMovies(this.state.currentPage);
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

  render() {
    const {topMovies} = this.props;
    const movies = movieHelpers.getMoviesList(topMovies.response);

    return (
      <div>
        <AppBar style={{background: '#750000', height: 50, alignItems:'center'}} title='酷优视频'>

          <div style={{display: 'flex',justifyContent:'center', alignItems:'center'}}>
            <FlatButton style={styles.navButton} variant="contained" color="secondary">
              热门
            </FlatButton>
            <FlatButton style={styles.navButton} variant="contained" color="secondary">
              日本AV
            </FlatButton>
            <FlatButton style={styles.navButton} variant="contained" color="secondary">
              欧美AV
            </FlatButton>
          </div>
        </AppBar>

        <Grid>
          <Row>
          </Row>
          <Row>
            <MovieList movies={movies} isLoading={topMovies.isLoading}/>
          </Row>
        </Grid>
      </div>
    );
  }
}

const styles= {
  navButton: {
    color: 'white'
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
