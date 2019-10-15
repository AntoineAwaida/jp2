import MSSQL from 'react-native-mssql';

import AsyncStorage from '@react-native-community/async-storage';

export default async function connect() {
  try {
    let config = await AsyncStorage.getItem('credentials');

    config = await JSON.parse(config);
    config.timeout = 5;
    const depot = config.depot;
    delete config.depot;

    return await MSSQL.connect(config);
  } catch (e) {
    throw Error(
      'No credentials provided. Please login as admin and set credentials first.',
    );
  }
}
