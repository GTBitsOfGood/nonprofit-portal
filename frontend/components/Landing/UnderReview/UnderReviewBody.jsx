import React from 'react';
import LandingBodyMessage from '../LandingBodyMessage';
import LandingImage from '../LandingImage';

const UnderViewBody = () => (
  <>
    <LandingBodyMessage width={750}>
      We enjoyed the meeting with you! Hang tight for the updates for your
      application. We still need more time to tell our team about your
      organization and the product goals to make decisions accordingly.
      We appreciate your time and patience. Before the decision is made,
      feel free to contact us if you have any further questions.
    </LandingBodyMessage>
    <LandingImage src="/static/review.svg" alt="Application submitted" />
  </>
);

export default UnderViewBody;
