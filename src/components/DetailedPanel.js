import React, { Component, PropTypes } from 'react';
import { DetailedSubPanel } from '../components';
import { Panel, PanelGroup, Tabs, Tab } from 'react-bootstrap';
import map from 'lodash.map';

export default class DetailedPanel extends Component {
  render() {
    return (
      <Panel aria-live="polite" header={<h2>Detailed Reports</h2>}>
        {map(this.props.data, (item) =>
          <PanelGroup key={this.props.data.indexOf(item)}>
            <Panel header={<h3><a href={`//${item.entry}`} target="_blank">{item.entry}</a></h3>}>
              {/* TODO refactor this, map categories to subpanels */}
                <Tabs defaultActiveKey={1} animation={false}>
                  <Tab
                    tabClassName="tab-error"
                    eventKey={1}
                    title={`Errors: ${item.data.categories.error.count}`}
                  >
                    <DetailedSubPanel
                      caption={`Errors for ${item.entry}`}
                      data={item.data.categories.error}
                    />
                  </Tab>
                  <Tab
                    tabClassName="tab-alert"
                    eventKey={2}
                    title={`Alerts: ${item.data.categories.alert.count}`}
                  >
                    <DetailedSubPanel
                      caption={`Alerts for ${item.entry}`}
                      data={item.data.categories.alert}
                    />
                  </Tab>
                  <Tab
                    tabClassName="tab-feature"
                    eventKey={3}
                    title={`Features: ${item.data.categories.feature.count}`}
                  >
                    <DetailedSubPanel
                      caption={`Features for ${item.entry}`}
                      data={item.data.categories.feature}
                    />
                  </Tab>
                  <Tab
                    tabClassName="tab-structure"
                    eventKey={4}
                    title={`Structure: ${item.data.categories.structure.count}`}
                  >
                    <DetailedSubPanel
                      caption={`Structure items for ${item.entry}`}
                      data={item.data.categories.structure}
                    />
                  </Tab>
                  <Tab
                    tabClassName="tab-html5"
                    eventKey={5}
                    title={`HTML5 and ARIA: ${item.data.categories.html5.count}`}
                  >
                    <DetailedSubPanel
                      caption={`HTML5 and ARIA items for ${item.entry}`}
                      data={item.data.categories.html5}
                    />
                  </Tab>
                  <Tab
                    tabClassName="tab-contrast"
                    eventKey={6}
                    title={`Contrast: ${item.data.categories.contrast.count}`}
                  >
                    <DetailedSubPanel
                      caption={`Contrast items for ${item.entry}`}
                      data={item.data.categories.contrast}
                    />
                  </Tab>
                </Tabs>
              </Panel>
          </PanelGroup>
        )}
      </Panel>
    );
  }
}

DetailedPanel.propTypes = {
  data: PropTypes.array.isRequired,
};

export default DetailedPanel;
