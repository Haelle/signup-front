import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollablePanel } from '../elements/Scrollable';
import ValidatedEnrollmentsSelector from '../form/ValidatedEnrollmentsSelector';
import { TARGET_API_LABELS } from '../../pages/EnrollmentList';
import { hasAccessToEnrollment } from '../../lib/services';

const PreviousEnrollmentSection = ({
  previousTargetApi = 'franceconnect',
  Description = () => (
    <div className="text-quote">
      <p>
        Afin de pouvoir utiliser votre bouton FranceConnect pour récupérer les
        données, merci de renseigner la demande FranceConnect à associer à cette
        demande.
      </p>
    </div>
  ),
  isUserEnrollmentLoading = true,
  disabled = false,
  onChange = () => null,
  enrollment: { linked_franceconnect_enrollment_id = null, target_api },
}) => {
  const [
    hasAccessToPreviousEnrollment,
    setHasAccessToPreviousEnrollment,
  ] = useState(false);

  useEffect(() => {
    async function fetchHasAccessToEnrollment() {
      if (!linked_franceconnect_enrollment_id) return null;

      const result = await hasAccessToEnrollment(
        linked_franceconnect_enrollment_id
      );

      setHasAccessToPreviousEnrollment(result);
    }

    fetchHasAccessToEnrollment();
  }, [linked_franceconnect_enrollment_id]);

  return (
    <ScrollablePanel scrollableId="franceconnect">
      <h2>Demande {TARGET_API_LABELS[previousTargetApi]} associée</h2>
      <Description />
      <br />
      {!isUserEnrollmentLoading && !disabled && (
        <ValidatedEnrollmentsSelector
          onValidatedEnrollment={onChange}
          linkedTargetApi={previousTargetApi}
          enrollmentTargetApi={target_api}
          linked_franceconnect_enrollment_id={
            linked_franceconnect_enrollment_id
          }
        />
      )}
      {disabled && (
        <div className="button-list enrollment">
          {hasAccessToPreviousEnrollment ? (
            <a
              href={`/franceconnect/${linked_franceconnect_enrollment_id}`}
              className="light"
            >
              Numéro de la demande associée :{' '}
              {linked_franceconnect_enrollment_id}
            </a>
          ) : (
            <>
              Numéro de la demande associée :{' '}
              {linked_franceconnect_enrollment_id}
            </>
          )}
        </div>
      )}
    </ScrollablePanel>
  );
};

PreviousEnrollmentSection.propTypes = {
  previousTargetApi: PropTypes.string,
  Description: PropTypes.func,
  isUserEnrollmentLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  enrollment: PropTypes.shape({
    target_api: PropTypes.string,
    linked_franceconnect_enrollment_id: PropTypes.number,
  }),
};

export default PreviousEnrollmentSection;
