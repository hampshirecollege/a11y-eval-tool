/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { Panel, Table } from 'react-bootstrap';
import map from 'lodash.map';

/**
 * Internal dependencies
 */
import styles from './SummaryTable.css';

const propTypes = {
  // data: WAVE accessibility report type 1 data
  data: PropTypes.array.isRequired,
};

export default class SummaryTable extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data;
  }

  render() {
    return (
      <Panel aria-live="polite" header={<h2>Summary Report</h2>}>
        <Table id="sum-table" fill striped bordered hover responsive>
          <caption className="sr-only">Summary results</caption>
          <thead>
            <tr>
              <th scope="col">SITE URL</th>
              <th className={styles['th-error']} scope="col">ERRORS</th>
              <th className={styles['th-alert']} scope="col">ALERTS</th>
              <th className={styles['th-feature']} scope="col">FEATURES</th>
              <th className={styles['th-structure']} scope="col">STRUCTURE</th>
              <th className={styles['th-html5']} scope="col">HTML5 and ARIA</th>
              <th className={styles['th-contrast']} scope="col">CONTRAST</th>
            </tr>
          </thead>
          <tbody>
            {map(this.props.data, (item, index) =>
              <tr key={index}>
                <th scope="row">
                  <a href={`//${item.entry}`} target="_blank">
                    {item.error &&
                      <span className="row-err">{item.error}</span>
                    }
                    {` ${item.entry}`}
                  </a>
                </th>
                <td>{item.data.categories.error.count}</td>
                <td>{item.data.categories.alert.count}</td>
                <td>{item.data.categories.feature.count}</td>
                <td>{item.data.categories.structure.count}</td>
                <td>{item.data.categories.html5.count}</td>
                <td>{item.data.categories.contrast.count}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Panel>
    );
  }
}

SummaryTable.propTypes = propTypes;
