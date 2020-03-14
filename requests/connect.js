import AsyncStorage from '@react-native-community/async-storage';

export default async function connect() {
  let config = await AsyncStorage.getItem('credentials');

  config = await JSON.parse(config);

  config.user = config.username;

  delete config.depot;
  delete config.limitArticles;
  return config;
}
