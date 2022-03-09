import React from 'react';
import LandingBodyMessage from '../LandingBodyMessage';
import LandingImage from '../LandingImage';

const AppSubmittedBody = () => (
  <>
    <LandingBodyMessage width={750}>
    Your application has been submitted to the BoG team successfully!
    You will get an email notification after we finish reviewing your application.
    If we decide to move on with your project, the next step will be an interview to
    better understand your project and if it’s a good fit for Bits of Good.
    </LandingBodyMessage>
    <LandingImage src="/static/review.svg" alt="Application submitted" />
  </>
);

export default AppSubmittedBody;
