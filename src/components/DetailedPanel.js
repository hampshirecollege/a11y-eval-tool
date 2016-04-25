/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { Panel, Tabs, Tab } from 'react-bootstrap';
import map from 'lodash.map';

/**
 * Internal dependencies
 */
import { DetailedTableSingle, DetailedTableAll } from '../components';

const propTypes = {
  // data: WAVE accessibility report type 2 data
  data: PropTypes.array.isRequired,
};

export default class DetailedPanel extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data;
  }

  render() {
    return (
      <Panel aria-live="polite" header={<h2>Detailed Reports</h2>}>
        {map(this.props.data, (item, index) =>
          <Panel
            key={this.props.data.indexOf(item)}
            header={<h3><a href={`//${item.entry}`} target="_blank">{item.entry}</a></h3>}
          >
            {item.error === '' ?
              <Tabs defaultActiveKey={1} animation={false}>
                <Tab
                  tabClassName="tab-error"
                  eventKey={1}
                  title={`Errors: ${item.data.categories.error.count}`}
                >
                  <DetailedTableSingle
                    siteIndex={index}
                    caption={`Errors for ${item.entry}`}
                    data={item.data.categories.error}
                    thStyle="th-errors"
                  />
                </Tab>
                <Tab
                  tabClassName="tab-alert"
                  eventKey={2}
                  title={`Alerts: ${item.data.categories.alert.count}`}
                >
                  <DetailedTableSingle
                    siteIndex={index}
                    caption={`Alerts for ${item.entry}`}
                    data={item.data.categories.alert}
                    thStyle="th-alerts"
                  />
                </Tab>
                <Tab
                  tabClassName="tab-feature"
                  eventKey={3}
                  title={`Features: ${item.data.categories.feature.count}`}
                >
                  <DetailedTableSingle
                    siteIndex={index}
                    caption={`Features for ${item.entry}`}
                    data={item.data.categories.feature}
                    thStyle="th-features"
                  />
                </Tab>
                <Tab
                  tabClassName="tab-structure"
                  eventKey={4}
                  title={`Structure: ${item.data.categories.structure.count}`}
                >
                  <DetailedTableSingle
                    siteIndex={index}
                    caption={`Structure items for ${item.entry}`}
                    data={item.data.categories.structure}
                    thStyle="th-structure"
                  />
                </Tab>
                <Tab
                  tabClassName="tab-html5"
                  eventKey={5}
                  title={`HTML5 and ARIA: ${item.data.categories.html5.count}`}
                >
                  <DetailedTableSingle
                    siteIndex={index}
                    caption={`HTML5 and ARIA items for ${item.entry}`}
                    data={item.data.categories.html5}
                    thStyle="th-html5"
                  />
                </Tab>
                <Tab
                  tabClassName="tab-contrast"
                  eventKey={6}
                  title={`Contrast: ${item.data.categories.contrast.count}`}
                >
                  <DetailedTableSingle
                    siteIndex={index}
                    caption={`Contrast items for ${item.entry}`}
                    data={item.data.categories.contrast}
                    thStyle="th-contrast"
                  />
                </Tab>
                <Tab
                  tabClassName="tab-all"
                  eventKey={7}
                  title="View All"
                >
                  <DetailedTableAll
                    siteIndex={index}
                    entry={item.entry}
                    data={item.data}
                  />
                </Tab>
              </Tabs>
              : <span className="row-err">{item.error} unable to scan {item.entry}, check that the URL is correct.
              </span>
            }
          </Panel>
        )}
      </Panel>
    );
  }
}

DetailedPanel.propTypes = propTypes;
