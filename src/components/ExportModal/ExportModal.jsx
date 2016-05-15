/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

const propTypes = {
  // preventDefault: Prevents form submission
  preventDefault: PropTypes.func.isRequired,
  // exportReport: Export report data to file
  exportReport: PropTypes.func.isRequired,
  // showModal: Shows the modal
  show: PropTypes.bool.isRequired,
  // closeModal: Closes the modal
  close: PropTypes.func.isRequired,
};

/**
 * Component
 */
function ExportModal({ show, close, exportReport, preventDefault }) {
  return (
    <Modal show={show} onHide={close} onExited={() => document.getElementById('export-button').focus()}>
      <Modal.Header closeButton>
        <Modal.Title>Export Report Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={preventDefault}>
          <FormGroup controlId="file-type-select">
            <ControlLabel>Select File Format</ControlLabel>
            <FormControl componentClass="select">
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
              <option value="html">HTML</option>
            </FormControl>
          </FormGroup>
          <FormGroup controlId="filename">
            <ControlLabel>Filename</ControlLabel>
            <FormControl placeholder="Enter filename (without extension(s))" />
          </FormGroup>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="primary" onClick={exportReport}>Export Data</Button>
        <Button onClick={close}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

ExportModal.propTypes = propTypes;

export default ExportModal;
