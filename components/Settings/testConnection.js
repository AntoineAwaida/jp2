import {fetchConnect} from '../../requests/fetch';

export default async function testConnection() {
  return await fetchConnect();
}
