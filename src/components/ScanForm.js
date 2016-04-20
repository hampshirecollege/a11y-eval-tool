/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { Input, ButtonInput } from 'react-bootstrap';

/**
 * Internal dependencies
 */
import { ExportModal } from '../components';

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
function ScanForm({ dataLength, preventDefault, scanURLs, exportReport, showModal, openModal, closeModal }) {
  return (
    <form onSubmit={preventDefault}>
      <div className="options-key-container">
        <Input
          type="select"
          className="type-select"
          label="Scan Type"
          id="scan-type"
          defaultValue="1"
        >
          <optgroup label="Scan Type">
            <option value="1">Summary (1 credit)</option>
            <option value="2">Detailed (2 credits)</option>
          </optgroup>
        </Input>
        <Input
          className="key-text"
          type="text"
          label="WAVE API Key"
          id="api-key"
          placeholder="Enter WAVE API key"
        />
      </div>
      <Input
        type="textarea"
        spellCheck="false"
        label="URL List"
        id="url-list"
        placeholder="Enter a carriage return separated URL list to scan.
        The protocol (http or https) is not necessary and will be stripped from the results."
      />
      <div className="button-container" aria-live="polite">
        <ButtonInput value="Scan URLs" onClick={scanURLs} />
        {dataLength !== 0 &&
          <ButtonInput value="Export Report" onClick={openModal} />
        }
        <ExportModal show={showModal} close={closeModal} exportReport={exportReport} />
      </div>
    </form>
  );
}

ScanForm.propTypes = propTypes;

export default ScanForm;
