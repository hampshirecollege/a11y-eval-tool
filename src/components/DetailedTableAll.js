import React, { PropTypes } from 'react';
import { DetailedTableSingle } from '../components';

const DetailedTableAll = ({ entry, data }) => (
  <div className="table-all">
    <DetailedTableSingle
      itemType="ERRORS"
      caption={`Errors for ${entry}`}
      data={data.categories.error}
      thStyle="th-errors"
    />
    <DetailedTableSingle
      itemType="ALERTS"
      caption={`Alerts for ${entry}`}
      data={data.categories.alert}
      thStyle="th-alerts"
    />
    <DetailedTableSingle
      itemType="FEATURES"
      caption={`Features for ${entry}`}
      data={data.categories.feature}
      thStyle="th-features"
    />
    <DetailedTableSingle
      itemType="STRUCTURE"
      caption={`Structure items for ${entry}`}
      data={data.categories.structure}
      thStyle="th-structure"
    />
    <DetailedTableSingle
      itemType="HTML5 and ARIA"
      caption={`HTML5 and ARIA items for ${entry}`}
      data={data.categories.html5}
      thStyle="th-html5"
    />
    <DetailedTableSingle
      itemType="CONTRAST"
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
