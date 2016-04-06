import React, { Component, PropTypes } from 'react';
import { DetailedTableSingle, DetailedTableAll } from '../components';
import { Panel, Tabs, Tab } from 'react-bootstrap';
import map from 'lodash.map';

export default class DetailedPanel extends Component {
  render() {
    return (
      <Panel aria-live="polite" header={<h2>Detailed Reports</h2>}>
        {map(this.props.data, (item) =>
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

DetailedPanel.propTypes = {
  data: PropTypes.array.isRequired,
};

export default DetailedPanel;
