/**
 * @format
 */
import {YellowBox} from 'react-native';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

YellowBox.ignoreWarnings([]);
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
