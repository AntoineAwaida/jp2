import MSSQL from 'react-native-mssql';
import AsyncStorage from '@react-native-community/async-storage';

export default async function testConnection() {
  let config = await AsyncStorage.getItem('credentials');
  config = await JSON.parse(config);
  config.timeout = 5;
  delete config.depot;
  return await MSSQL.connect(config);
}
