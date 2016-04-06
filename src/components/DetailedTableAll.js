import React, { PropTypes } from 'react';
import { DetailedTableSingle } from '../components';

const DetailedTableAll = ({ data }) => (
  <div>
  <p />
    <DetailedTableSingle
      caption={`Errors for ${data.entry}`}
      data={data.categories.error}
      thStyle="th-errors"
    />
    <DetailedTableSingle
      caption={`Alerts for ${data.entry}`}
      data={data.categories.alert}
      thStyle="th-alerts"
    />
    <DetailedTableSingle
      caption={`Features for ${data.entry}`}
      data={data.categories.feature}
      thStyle="th-features"
    />
    <DetailedTableSingle
      caption={`Structure items for ${data.entry}`}
      data={data.categories.structure}
      thStyle="th-structure"
    />
    <DetailedTableSingle
      caption={`HTML5 and ARIA items for ${data.entry}`}
      data={data.categories.html5}
      thStyle="th-html5"
    />
    <DetailedTableSingle
      caption={`Contrast items for ${data.entry}`}
      data={data.categories.contrast}
      thStyle="th-contrast"
    />
  </div>
);

DetailedTableAll.propTypes = {
  caption: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]).isRequired,
  thStyle: PropTypes.string.isRequired,
};

export default DetailedTableAll;
