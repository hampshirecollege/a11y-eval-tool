import React, { PropTypes } from 'react';
import { DetailedTableSingle } from '../components';

const DetailedTableAll = ({ entry, data }) => (
  <div>
  <p />
    <DetailedTableSingle
      caption={`Errors for ${entry}`}
      data={data.categories.error}
      thStyle="th-errors"
    />
    <DetailedTableSingle
      caption={`Alerts for ${entry}`}
      data={data.categories.alert}
      thStyle="th-alerts"
    />
    <DetailedTableSingle
      caption={`Features for ${entry}`}
      data={data.categories.feature}
      thStyle="th-features"
    />
    <DetailedTableSingle
      caption={`Structure items for ${entry}`}
      data={data.categories.structure}
      thStyle="th-structure"
    />
    <DetailedTableSingle
      caption={`HTML5 and ARIA items for ${entry}`}
      data={data.categories.html5}
      thStyle="th-html5"
    />
    <DetailedTableSingle
      caption={`Contrast items for ${entry}`}
      data={data.categories.contrast}
      thStyle="th-contrast"
    />
  </div>
);

DetailedTableAll.propTypes = {
  entry: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]).isRequired,
};

export default DetailedTableAll;
