import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  };
  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className='ui button primary'>
            Edit
          </Link>
          <Link to={`/streams/delete/${stream.id}`} className='ui negative button'>
            Delete
          </Link>
        </div>
      )
    }
  };
  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className='ui button primary'>
            Create Stream
          </Link>
        </div>
      )
    }
  };

  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <div className='item' key={stream.id}>
          {this.renderAdmin(stream)}
          <i className='large middle aligned icon camera' />
          <div className='content'>
            <Link to={`/streams/${stream.id}`}> {stream.title}</Link>
            <div className='description'>
              {stream.description}
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    console.log(this.props.streams);
    return (
      <div>
        <h2>Streams</h2>
        <div className='ui celled list'>
          {this.renderList()}
        </div>
        {this.renderCreate()}
      </div>
    )
  }
};
const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),//<--Object.value is an javascript built-in function that take an object and push all its key->values  
    // we are converting the required data into a array to use that map funtion  
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
}
export default connect(mapStateToProps, { fetchStreams })(StreamList);