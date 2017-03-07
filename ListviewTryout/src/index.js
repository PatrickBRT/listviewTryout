import React, { Component } from 'react';
import { ListView } from 'react-native';
import { times } from 'lodash';

import SGListView from 'react-native-sglistview';
import {
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

const LIST_VIEW = 'listview';

const TEST_IMAGE = require("./images/reactNative.png");

export default class ListviewTryout extends Component {
  props: Props;
  items: Array<object>;

  constructor(props: Props) {
    super(props);

    this.items = [];
    let items = this.items;
    times(500, () => {
      items.push({
        a: 'b',
      });
    });

    this.renderRow = this.renderRow.bind(this);
  }

  render() {

    return (
     <View style={{flex:1}}>
        <SGListView
          style={{flex:1}}
          ref={LIST_VIEW}
          dataSource={this.getDataSource()}
          renderRow={this.renderRow}
        />
     </View>
    );
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{height: 240, width: 240, borderColor: 'gray', borderWidth: 1, borderStyle: 'solid'}}
          source={TEST_IMAGE}
        >
        <Text style={{fontSize: 30, alignSelf: 'center'}}>{rowID}</Text>
        </Image>
      </View>
    );
  }

  getDataSource() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.uuid !== r2.uuid }
    );

    return dataSource.cloneWithRows(this.items);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

