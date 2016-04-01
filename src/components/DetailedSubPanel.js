import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import map from 'lodash.map';

const DetailedSubPanel = ({ caption, data }) => (
  <Table className="results-table" fill striped bordered condensed hover responsive>
    <caption className="sr-only">{caption}</caption>
    <thead>
      {data.count > 0 &&
        <tr>
          <th scope="col">ITEM</th>
          <th scope="col">COUNT</th>
          <th scope="col">DESCRIPTION</th>
        </tr>
      }
    </thead>
    <tbody>
      {map(data.items, (item) =>
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.count}</td>
          <td>{item.description}</td>
        </tr>
      )}
    </tbody>
  </Table>
);

DetailedSubPanel.propTypes = {
  caption: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]).isRequired,
};

export default DetailedSubPanel;
