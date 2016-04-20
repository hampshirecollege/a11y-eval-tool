/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { Modal, Input, Button } from 'react-bootstrap';

const propTypes = {
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
function ExportModal({ show, close, exportReport }) {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Export Report Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <Input
            id="file-type-select"
            type="select"
            label="Select File Format(s)"
            placeholder="file format"
            multiple
          >
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
            <option value="html">HTML</option>
          </Input>
          <Input
            className="filename"
            type="text"
            label="Filename"
            id="filename"
            placeholder="Enter filename (without extension(s))"
          />
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
