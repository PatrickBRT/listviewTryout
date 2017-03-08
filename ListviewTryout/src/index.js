import React, { Component } from 'react';
import { ListView } from 'react-native';
import { times, random } from 'lodash';

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
      const nextRandom = random(0,100);
      if (nextRandom % 2 === 0) {
        items.push({
          type: 'image',
        });
      } else {
        items.push({

        });
      }
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

  renderCard(rowData, rowID) {
    const content = (<Text style={{fontSize: 30, alignSelf: 'center'}}>{rowID}</Text>);
    if (rowData.type) {
      return (<Image
        style={{height: 240, width: 240, borderColor: 'gray', borderWidth: 1, borderStyle: 'solid'}}
        source={TEST_IMAGE}
      >
        {content}
      </Image>);
    }
    return (
      <View style={{width: 240, height: 240, borderColor: 'gray', borderWidth: 1, borderStyle: 'solid'}}>
        {content}
      </View>
    );
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <View style={{flexDirection: 'row'}}>
        {this.renderCard(rowData, rowID)}
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

