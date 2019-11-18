import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { withSnackbar } from 'notistack';

import Router from 'next/router';
import GeneralInformation from './GeneralInformation';
import MissionVision from './MissionVision';
import ProductNeeds from './ProductNeeds';
import Feedback from './Feedback';
import { addApplication as addApplicationBase } from '../redux/actions/applicationActions';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email!')
    .required('Required'),
  website: Yup.string().url('Website must be a valid URL!'),
});

class ApplicationForm extends React.PureComponent {
  submitForm = async (values) => {
    const { addApplication, enqueueSnackbar, closeSnackbar } = this.props;

    addApplication(values)
      .then(async ({ payload }) => {
        closeSnackbar(this.errorKey);
        this.errorKey = null;

        await Router.push(`/p/${payload.urlString}`);
      })
      .catch((e) => {
        if (this.errorMessage !== e.message) {
          closeSnackbar(this.errorKey);
          this.errorKey = null;
        }

        if (this.errorKey == null) {
          this.errorMessage = e.message;
          this.errorKey = enqueueSnackbar('Failed to submit application!', {
            variant: 'error',
            persist: true,
          });
        }
      });
  };

  render() {
    return (
      <Formik
        initialValues={{
          email: '',
          website: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={this.submitForm}
      >
        {(formikProps) => (
          <Form onSubmit={formikProps.handleSubmit}>
            <GeneralInformation
              onChange={formikProps.handleChange}
              values={formikProps.values}
              onBlur={formikProps.handleBlur}
            />
            <MissionVision onChange={formikProps.handleChange} values={formikProps.values} />
            <ProductNeeds onChange={formikProps.handleChange} values={formikProps.values} />
            <Feedback onChange={formikProps.handleChange} values={formikProps.values} />
            <div className="d-flex justify-content-between">
              <div />
              <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group mr-2" role="group" aria-label="First group">
                  <Button outline color="dark">Reset</Button>
                </div>
                <div className="btn-group mr-2" role="group" aria-label="Second group">
                  <Button type="submit" color="dark" className="btn btn-secondary">Submit</Button>
                </div>
              </div>
              <div />
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}

ApplicationForm.propTypes = {
  addApplication: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  closeSnackbar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  application: state.application,
});

export default connect(mapStateToProps, {
  addApplication: addApplicationBase,
})(withSnackbar(ApplicationForm));
