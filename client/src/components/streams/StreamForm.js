import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className='ui error message'>
                    <div className='header'>{error}</div>
                </div>
            )
        }
    }
    renderInput = (formProps) => {
        // console.log(formProps.meta);
        // return(
        //       <input 
        //        onChange={formProps.input.onChange}
        //        value={formProps.input.value}
        //        />
        //      );
        const classname = `field ${formProps.meta.error && formProps.meta.touched ? 'error' : ''}`;
        return (
            <div className={classname}>
                <label>{formProps.label}</label>
                <input {...formProps.input} autoComplete="off" />
                {this.renderError(formProps.meta)}
            </div>
        );
    };
    onSubmit = (formValue) => {
        console.log(formValue);
        this.props.onSubmit(formValue);
    }

    render() {

        return (
            <form
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter description" />
                <button className="ui button primary" >Enter</button>
            </form>
        );
    };
};

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        errors.title = "You must enter a title";
    }
    if (!formValues.description) {
        errors.description = "You must enter a description"
    }
    return errors;
}

// export default connect()(reduxForm({
//      form:'streamCreate',
//       validate
//             })(StreamCreate));

//           OR

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);
