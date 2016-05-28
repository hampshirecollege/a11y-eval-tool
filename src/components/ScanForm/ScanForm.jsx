/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

/**
 * Internal dependencies
 */
import { ExportModal } from '../../components';
import styles from './ScanForm.css';

const propTypes = {
  // dataLength: Length of data array, if > 0, then render export button
  dataLength: PropTypes.number.isRequired,
  // preventDefault: Prevent default form onSubmit behavior
  preventDefault: PropTypes.func.isRequired,
  // scanURLs: Function that loops through list of URLs and fetches WAVE results
  scanURLs: PropTypes.func.isRequired,
  // exportReport: Export report data to file
  exportReport: PropTypes.func.isRequired,
  // showModal: Whether or not modal is visible
  showModal: PropTypes.bool.isRequired,
  // openModal: Shows the modal
  openModal: PropTypes.func.isRequired,
  // closeModal: Closes the modal
  closeModal: PropTypes.func.isRequired,
};

/**
 * Component
 */
function ScanForm({ dataLength, preventDefault, scanURLs, exportReport,
showModal, openModal, closeModal }) {
  return (
    <form onSubmit={preventDefault}>
      <div className={styles['options-key-container']}>
        <FormGroup controlId="scan-type">
          <ControlLabel>Scan Type</ControlLabel>
          <FormControl componentClass="select">
            <option value="1">Summary (1 credit)</option>
            <option value="2">Summary & Detailed (2 credits)</option>
          </FormControl>
        </FormGroup>
        <FormGroup controlId="api-key">
          <ControlLabel>WAVE API Key</ControlLabel>
          <FormControl placeholder="Enter WAVE API key" />
        </FormGroup>
      </div>
      <FormGroup controlId="url-list">
        <ControlLabel>URL List</ControlLabel>
        <FormControl
          componentClass="textarea"
          spellCheck="false"
          placeholder="Enter a carriage return separated URL list to scan.
          The protocol (http or https) is not necessary and will be
          stripped from the results."
        />
      </FormGroup>
      <div className={styles['button-container']} aria-live="polite">
        <Button onClick={scanURLs}>Scan URLs</Button>
        {dataLength !== 0 &&
          <Button id="export-button" onClick={openModal}>Export Report</Button>
        }
        <ExportModal
          show={showModal}
          close={closeModal}
          exportReport={exportReport}
          preventDefault={preventDefault}
        />
      </div>
    </form>
  );
}

ScanForm.propTypes = propTypes;

export default ScanForm;
