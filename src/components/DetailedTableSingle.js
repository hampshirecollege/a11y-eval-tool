/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { Table, Button, Modal, Glyphicon } from 'react-bootstrap';
import map from 'lodash.map';
import he from 'he';

/**
 * Internal dependencies
 */
import waveDocs from '../wave_docs/wave_docs.json';

const propTypes = {
  // siteIndex: Index of site in URL array
  siteIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  // itemType: Report item type
  itemType: PropTypes.oneOf(['ERRORS', 'ALERTS', 'FEATURES', 'STRUCTURE', 'HTML5 and ARIA', 'CONTRAST']),
  // caption: Table caption for screen readers
  caption: PropTypes.string.isRequired,
  // data: WAVE accessibility report type 2 data for specific item type
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  // thStyle: Table heading styles for font and background colors
  thStyle: PropTypes.oneOf([
    'th-errors', 'th-alerts', 'th-features', 'th-structure', 'th-html5', 'th-contrast',
  ]).isRequired,
};

export default class DetailedTableSingle extends Component {
  constructor() {
    super();

    this.state = {
      showModal: {},
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    const modalObj = {};

    map(this.props.data.items, (item) => {
      modalObj[`${this.props.siteIndex}-${item.id}`] = false;
    });

    this.setState({ showModal: modalObj });
  }

  openModal(key) {
    this.setState({ showModal: Object.assign({}, this.state.showModal, this.state.showModal[key] = true) });
  }

  closeModal(key) {
    this.setState({ showModal: Object.assign({}, this.state.showModal, this.state.showModal[key] = false) });
  }

  render() {
    return (
      <Table className="results-table" fill striped bordered responsive tabIndex="0">
        <caption className="sr-only">{this.props.caption}</caption>
        <thead>
          {this.props.data.count > 0 &&
            <tr>
              <th className={this.props.thStyle} scope="col">
                {this.props.itemType !== undefined ? this.props.itemType : 'ITEM'}
              </th>
              <th className={this.props.thStyle} scope="col">COUNT</th>
              <th className={this.props.thStyle} scope="col">DESCRIPTION</th>
            </tr>
          }
        </thead>
        <tbody>
          {map(this.props.data.items, (item) =>
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.count}</td>
              <td>
                <Button
                  id={`${this.props.siteIndex}-button-${item.id}`}
                  bsStyle="link"
                  onClick={() => this.openModal(`${this.props.siteIndex}-${item.id}`)}
                >
                  <Glyphicon glyph="info-sign" />
                  &nbsp;{item.description}
                </Button>
                <Modal
                  show={this.state.showModal[`${this.props.siteIndex}-${item.id}`]}
                  onHide={() => this.closeModal(`${this.props.siteIndex}-${item.id}`)}
                  onExited={() => document.getElementById(`${this.props.siteIndex}-button-${item.id}`).focus()}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>{item.description}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p><strong>What It Means</strong></p>
                    <p>{he.decode(`${waveDocs[item.id].data.summary}`)}</p>
                    <p><strong>Why It Matters</strong></p>
                    <p>{he.decode(`${waveDocs[item.id].data.purpose}`)}</p>
                    <p><strong>How to Fix It</strong></p>
                    <p>{he.decode(`${waveDocs[item.id].data.actions}`)}</p>
                    <p><strong>The Algorithm... in English</strong></p>
                    <p>{he.decode(`${waveDocs[item.id].data.details}`)}</p>
                    <p><strong>Standards and Guidelines</strong></p>
                    <ul>
                      {map(waveDocs[item.id].data.guidelines, (guideline, index) =>
                        <li key={`${item.id}-${index}`}>
                          <a href={guideline.link} target="_blank">{guideline.name}</a>
                        </li>
                      )}
                    </ul>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={() => this.closeModal(`${this.props.siteIndex}-${item.id}`)}>Close</Button>
                  </Modal.Footer>
                </Modal>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }
}

DetailedTableSingle.propTypes = propTypes;
