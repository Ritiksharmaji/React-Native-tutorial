/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import ToggleShow from './components/ToggleShow';
import TogglageShowComponentWillUnmount from './components/ToggleShowComponentWillUnmount';

// AppRegistry.registerComponent(appName, () => App);
//AppRegistry.registerComponent(appName, () => ToggleShow);
AppRegistry.registerComponent(appName, () => TogglageShowComponentWillUnmount);