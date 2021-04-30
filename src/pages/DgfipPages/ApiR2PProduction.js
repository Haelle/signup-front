import React from 'react';
import PropTypes from 'prop-types';

import { API_ICONS, TARGET_API_LABELS } from '../../lib/api';

import Form from '../../components/templates/Form';
import HomologationSecuriteSection from '../../components/organisms/form-sections/dgfip-sections/HomologationSecuriteSection';
import RecetteFonctionnelleSection from '../../components/organisms/form-sections/dgfip-sections/RecetteFonctionnelleSection';
import CadreJuridiqueSection from '../../components/organisms/form-sections/CadreJuridiqueSection';
import DonneesPersonnellesSection from '../../components/organisms/form-sections/DonneesPersonnellesSection';
import VolumetrieSection from '../../components/organisms/form-sections/dgfip-sections/VolumetrieSection';
import CguSection from '../../components/organisms/form-sections/CguSection';
import {
  DemarcheDescriptionProduction as DemarcheDescription,
  PreviousEnrollmentDescription,
} from './common';

const target_api = 'api_r2p_production';
const steps = ['api_r2p_sandbox', target_api];

const ApiR2PProduction = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <Form
    enrollmentId={enrollmentId}
    target_api={target_api}
    steps={steps}
    PreviousEnrollmentDescription={PreviousEnrollmentDescription}
    title={`Demande d’accès ${TARGET_API_LABELS[target_api]}`}
    DemarcheDescription={DemarcheDescription}
    logo={{
      src: `/images/${API_ICONS[target_api]}`,
      alt: `Logo ${TARGET_API_LABELS[target_api]}`,
      url: 'https://www.impots.gouv.fr/',
    }}
    contactInformation={[
      {
        email: 'contact@api.gouv.fr',
        label: 'Nous contacter',
        subject: `Contact%20via%20datapass.api.gouv.fr%20-%20${encodeURIComponent(
          TARGET_API_LABELS[target_api]
        )}`,
      },
    ]}
  >
    <RecetteFonctionnelleSection />
    <DonneesPersonnellesSection />
    <CadreJuridiqueSection />
    <HomologationSecuriteSection />
    <VolumetrieSection options={[1000]} />
    <CguSection cguLink="/docs/cgu_api_r2p_production_septembre2020_v2.5.pdf" />
  </Form>
);

ApiR2PProduction.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiR2PProduction.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiR2PProduction;
