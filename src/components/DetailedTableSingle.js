import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import map from 'lodash.map';

const DetailedTableSingle = ({ caption, data, thStyle }) => (
  <Table className="results-table" fill striped bordered condensed hover responsive tabIndex="0">
    <caption className="sr-only">{caption}</caption>
    <thead>
      {data.count > 0 &&
        <tr>
          <th className={thStyle} scope="col">ITEM</th>
          <th className={thStyle} scope="col">COUNT</th>
          <th className={thStyle} scope="col">DESCRIPTION</th>
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

DetailedTableSingle.propTypes = {
  caption: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]).isRequired,
  thStyle: PropTypes.string.isRequired,
};

export default DetailedTableSingle;
