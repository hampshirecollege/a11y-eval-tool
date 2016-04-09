import React, { PropTypes } from 'react';
import { DetailedTableSingle } from '../components';

const DetailedTableAll = ({ idIndex, entry, data }) => (
  <div>
    <DetailedTableSingle
      idIndex={idIndex}
      caption={`Errors for ${entry}`}
      data={data.categories.error}
      thStyle="th-errors"
    />
    <DetailedTableSingle
      idIndex={idIndex}
      caption={`Alerts for ${entry}`}
      data={data.categories.alert}
      thStyle="th-alerts"
    />
    <DetailedTableSingle
      idIndex={idIndex}
      caption={`Features for ${entry}`}
      data={data.categories.feature}
      thStyle="th-features"
    />
    <DetailedTableSingle
      idIndex={idIndex}
      caption={`Structure items for ${entry}`}
      data={data.categories.structure}
      thStyle="th-structure"
    />
    <DetailedTableSingle
      idIndex={idIndex}
      caption={`HTML5 and ARIA items for ${entry}`}
      data={data.categories.html5}
      thStyle="th-html5"
    />
    <DetailedTableSingle
      idIndex={idIndex}
      caption={`Contrast items for ${entry}`}
      data={data.categories.contrast}
      thStyle="th-contrast"
    />
  </div>
);

DetailedTableAll.propTypes = {
  idIndex: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
  entry: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]).isRequired,
};

export default DetailedTableAll;
