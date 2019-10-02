import MSSQL from 'react-native-mssql';

import AsyncStorage from '@react-native-community/async-storage';

export default async function config() {
  let config = await AsyncStorage.getItem('credentials');

  console.log(config);

  config = await JSON.parse(config);
  config.timeout = 5;
  const depot = config.depot;
  delete config.depot;
  await MSSQL.connect(config);
}
