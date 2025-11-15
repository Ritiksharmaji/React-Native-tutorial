/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import AppButtons from './components/ButtonsStyle'

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => AppButtons);
