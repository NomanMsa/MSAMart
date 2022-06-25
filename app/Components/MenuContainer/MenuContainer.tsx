// @flow
import React, { Component } from 'react'
import { View, Text, Dimensions, } from 'react-native';

import AccordionList from '../AccordionList/AccordionList.tsx';
import Collapse from '../Collapse/Collapse.tsx';
import CollapseBody from '../CollapseBody/CollapseBody.tsx';
import CollapseHeader from '../CollapseHeader/CollapseHeader.tsx';
import styles from './MenuContainerStyles';

type WindowDimensions = { width: number, height: number };

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class MenuContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      list: [
        {
          id: 1,
          title: 'Getting Started',
          body: 'React native Accordion/Collapse component, very good to use in toggles & show/hide content'
        },
        {
          id: 2,
          title: 'Components',
          body: 'AccordionList,Collapse,CollapseHeader & CollapseBody'
        },
        {
          id: 3,
          title: 'Components',
          body: 'AccordionList,Collapse,CollapseHeader & CollapseBody'
        },
        {
          id: 4,
          title: 'Sub Components too',
          body: 'this is col multi',
          sublist: [
            {
              id: 5,
              title: 'Components',
              body: 'AccordionList,Collapse,CollapseHeader & CollapseBody'
            },
            {
              id: 6,
              title: 'Components',
              body: 'AccordionList,Collapse,CollapseHeader & CollapseBody'
            },
            {
              id: 7,
              title: 'Components',
              body: 'AccordionList,Collapse,CollapseHeader & CollapseBody'
            },
          ]
        },
        {
          id: 5,
          title: 'Components',
          body: 'AccordionList,Collapse,CollapseHeader & CollapseBody'
        },
        {
          id: 6,
          title: 'Components',
          body: 'AccordionList,Collapse,CollapseHeader & CollapseBody'
        },
        {
          id: 7,
          title: 'Components',
          body: 'AccordionList,Collapse,CollapseHeader & CollapseBody'
        },
        {
          id: 8,
          title: 'Components',
          body: 'AccordionList,Collapse,CollapseHeader & CollapseBody'
        }
      ],
    }
    this.renderQuestionnaire = this.renderQuestionnaire.bind(this);
  }
  renderQuestionnaire({ item, index }) {
    console.log(item)
    const { width } = Dimensions.get('window');
    const itemWidth = 4;
    const deviceWidth = Math.floor(width / itemWidth) - 9;
    return <Collapse style={styles.collapsibleList}>
      <CollapseHeader style={styles.collapsibleHeader}>
        <View style={{ width: (SCREEN_WIDTH - 50) }}>
          <Text style={{ color: '#FFFFFF' }}>{item.title}</Text>
        </View>
      </CollapseHeader>
      <CollapseBody style={{ backgroundColor: '#EDEDED' }}>
        <View style={{ margin: 10, alignItems: 'flex-start', justifyContent: 'flex-start', width: (SCREEN_WIDTH - 20), flexDirection: 'row' }}>
          <Text>{item.title}</Text>
        </View>
      </CollapseBody>
    </Collapse>
  }
  _head(item) {
    return (
      <View style={{ width: (SCREEN_WIDTH - 50) }}>
        <Text style={{ color: '#FFFFFF' }}>{item.title}</Text>
      </View>
    );
  }
  _sublisthead(item) {
    return (<>
      {item.sublist ? <>
        <View style={{ width: (SCREEN_WIDTH - 50) }}>
          <Text style={{ color: '#FFFFFF' }}>{item.title}</Text>
          <AccordionList
            list={item.sublist}
            header={this._sublisthead}
            body={this._sublistbody}
            keyExtractor={item => `${item.id}`}
          />
        </View></> : <><View style={{ width: (SCREEN_WIDTH - 50) }}>
          <Text style={{ color: '#FFFFFF' }}>{item.title}</Text>
        </View></>
      }</>
    );
  }

  _body(item) {
    console.log(item.sublist);
    return (
      <>
        {item.sublist ? <>
          <View style={{ margin: 10, alignItems: 'flex-start', justifyContent: 'flex-start', width: (SCREEN_WIDTH - 20), flexDirection: 'row' }}>
            <Text>{item.body}</Text>
            <AccordionList
              list={item.sublist}
              header={this._sublisthead}
              body={this._sublistbody}
              keyExtractor={item => `${item.id}`}
            />
          </View></> : <>
            <View style={{ margin: 10, alignItems: 'flex-start', justifyContent: 'flex-start', width: (SCREEN_WIDTH - 20), flexDirection: 'row' }}>
              <Text>{item.body}</Text>
            </View></>
        }</>
    );
  }
  _sublistbody(item) {
    console.log(item.sublist);
    return (
      <View style={{ margin: 10, alignItems: 'flex-start', justifyContent: 'flex-start', width: (SCREEN_WIDTH - 20), flexDirection: 'row' }}>
        <Text>{item.body}</Text>
      </View>
    );
  }
  render() {
    const { onSlideClick } = this.props;
    return (
      <View>
        <AccordionList
          list={this.state.list}
          header={this._head}
          body={this._body}
          keyExtractor={item => `${item.id}`}
        />

      </View>
    )
  }
}