import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap-15';
import map from 'lodash.map';

const DetailedSummaryTable = ({ entry, categories }) => (
  <Table id="sum-table" fill striped bordered condensed hover responsive on>
    <caption className="sr-only">Summary results</caption>
    <thead>
      <tr>
        <th scope="col"
          data-sort-method="number"
          className="th-errors"
        >
          ERRORS
        </th>
        <th scope="col"
          data-sort-method="number"
          className="th-alerts"
        >
          ALERTS
        </th>
        <th scope="col"
          data-sort-method="number"
          className="th-features"
        >
          FEATURES
        </th>
        <th scope="col"
          data-sort-method="number"
          className="th-structure"
        >
          STRUCTURE
        </th>
        <th scope="col"
          data-sort-method="number"
          className="th-html5"
        >
          HTML5 and ARIA
        </th>
        <th scope="col"
          data-sort-method="number"
          className="th-contrast"
        >
          CONTRAST
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{categories.error.count}</td>
        <td>{categories.alert.count}</td>
        <td>{categories.feature.count}</td>
        <td>{categories.structure.count}</td>
        <td>{categories.html5.count}</td>
        <td>{categories.contrast.count}</td>
      </tr>
    </tbody>
  </Table>
);


DetailedSummaryTable.propTypes = {
  entry: PropTypes.string.isRequired,
  categories: PropTypes.object.isRequired,
};

export default DetailedSummaryTable;
