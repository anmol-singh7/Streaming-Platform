import React from 'react';
import {connect} from 'react-redux';
import Modal from '../modal';
import history from '../../history'; 
import { fetchStream,deleteStream } from '../../actions';
import {Link} from 'react-router-dom';


class StreamDelete extends React.Component {
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }
    renderContent(){
        if(!this.props.stream){
            return "Are you sure you want to delete this stream?";
        }
        return `Are you sure you want to delete this stream with title: ${this.props.stream.title}`;
    }
    renderAction(){
        const id=this.props.match.params.id
        return(
           <React.Fragment>
               <button onClick={()=>this.props.deleteStream(id)}className='ui negative button'>Delete</button>
               <Link to='/' className='ui button'>Cancel</Link>
           </React.Fragment>
            //OR
        // <>
        //     <button className='ui negative button'>Delete</button>
        //     <button className='ui button'>Cancel</button>
        // </>  //sometime this may giv error
          );
    }

    render(){
    return (
            <Modal 
            title="Delete Stream"
            content={this.renderContent()}
            actions={this.renderAction()}
            onDismiss={()=>history.push('/')}
            /> 
    );
  }
}
const mapStateToProps=(state,ownProps)=>{
    return {stream :state.streams[ownProps.match.params.id]};
};

export default connect(mapStateToProps,{fetchStream,deleteStream})(StreamDelete); 