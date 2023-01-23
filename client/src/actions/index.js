import streams from '../apis/streams';
import history from '../history';
import { 
        SIGN_IN, 
        SIGN_OUT, 
        CREATE_STREAM,
        FETCH_STREAMS, 
        FETCH_STREAM,
        DELETE_STREAM,
        EDIT_STREAM } from './types';

export const signIn=(userId)=>{
    return{
        type:SIGN_IN,
        payload:userId
    };
};

export const signOut=()=>{
    return {
        type:SIGN_OUT
    };
};

export const createStream=(formValues)=>{
    return async (dispatch,getState)=>{
        const {userId}= getState().auth;
       // console.log('response1',formValues)
       const response = await streams.post('/streams',{...formValues,userId});
       //console.log('response 2', response)
        dispatch({ type: CREATE_STREAM ,payload:response.data});
        //Do programmatic navigation to
        //get the user back to the root route
          history.push('/');
    };
};

//       OR
// export const createStream = (formValues) =>  async (dispatch) => {
//         const response = await streams.post('/streams', formValues);
//         dispatch({ type: CREATE_STREAM, payload: response.data });
//     };

export const fetchStreams =()=>{
    return async (dispatch)=>{
        const response = await streams.get('/streams');
        dispatch({type:FETCH_STREAMS,payload: response.data  });
    }
};

export const fetchStream=(id)=> async dispatch=>{
        const response = await streams.get(`/streams/${id}`);
        
        dispatch({type:FETCH_STREAM,payload:response.data});
    };

export const editStream =(id,formValue)=>
{
     return async (dispatch) =>{
       const response =await streams.patch(`/streams/${id}`,formValue);
       dispatch({type:EDIT_STREAM,payload:response.data});
       history.push('/');
     };
};

export const deleteStream=(id)=>{
  return async (dispatch)=>{
      await streams.delete(`/streams/${id}`);
       dispatch( {type:DELETE_STREAM,payload:id});
      history.push('/');
    };
};

