import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import GeneralInformation from './GeneralInformation';
import MissionVision from './MissionVision';
import ProductNeeds from './ProductNeeds';
import Feedback from './Feedback';
import { addApplication as addApplicationBase } from '../../redux/actions/applicationActions';
import {
  addNotification as addNotificationBase,
  deleteNotification as deleteNotificationBase,
} from '../../redux/actions/notificationActions';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email!')
    .required('Required'),
  website: Yup.string().url('Website must be a valid URL!'),
});

const ApplicationForm = (props) => {
  const [errorKeys, setErrorKeys] = React.useState([]);

  return (
    <Formik
      initialValues={{
        email: '',
        website: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        const { addApplication, addNotification, deleteNotification } = props;

        addApplication(values)
          .then(async ({ payload }) => {
            deleteNotification(...errorKeys);

            await addNotification({
              header: 'Successfully submitted application!',
              type: 'success',
            });

            window.location.href = `/p/${payload.urlString}`;
          })
          .catch(async () => {
            const { payload } = await addNotification({
              header: 'Failed to submit application!',
              body: 'Please make sure are required fields are filled out.',
              type: 'error',
            });

            setErrorKeys((oldArray) => [...oldArray, payload.key]);
          });
      }}
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
};

ApplicationForm.propTypes = {
  addApplication: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  deleteNotification: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  application: state.application,
});

export default connect(mapStateToProps, {
  addApplication: addApplicationBase,
  addNotification: addNotificationBase,
  deleteNotification: deleteNotificationBase,
})(ApplicationForm);
