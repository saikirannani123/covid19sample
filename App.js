/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  StatusBar,
} from 'react-native';
import {Provider} from 'react-redux';
import StoreConfig from './src/configs/StoreConfig';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RootStack from './src/navigation/RootNavigation'

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="light-content"/>
      <Provider store={StoreConfig}>
      <RootStack />
</Provider>
    </>
  );
};

export default App;