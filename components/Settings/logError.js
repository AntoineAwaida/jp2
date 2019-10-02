import AsyncStorage from "@react-native-community/async-storage";

export default async function logError(e) {
  errors = await AsyncStorage.getItem("logs");

  if (!errors) {
    errors = [{ date: new Date().toLocaleString(), error: e.message }];

    AsyncStorage.setItem("logs", JSON.stringify(errors));
  } else {
    errors = JSON.parse(errors);
    errors.push({ date: new Date().toLocaleString(), error: e.message });

    AsyncStorage.setItem("logs", JSON.stringify(errors));
  }
}
