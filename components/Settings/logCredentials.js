import AsyncStorage from '@react-native-community/async-storage';

export default async function logCredentials(
  server,
  username,
  password,
  database,
  port,
  depot,
) {
  await AsyncStorage.removeItem('credentials');

  if (depot === '') {
    depot = null;
  }

  const credentials = {
    server: server,
    username: username,
    password: password,
    database: database,
    port: parseInt(port),
    depot: depot,
  };

  AsyncStorage.setItem('credentials', JSON.stringify(credentials));
}
