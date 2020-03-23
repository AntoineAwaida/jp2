import connect from './connect';
import Axios from 'axios';

const api = 'http://sync.ecranbleuxv.com/api/app/';

export async function fetchRequest(query) {
  try {
    const config = await connect();

    const response = await Axios.post(api + 'request', {query, config});

    return response.data;
  } catch (e) {
    throw Error(e);
  }
}

export async function saveOrder(commande, comp) {
  try {
    const config = await connect();

    const response = await Axios.post(api + 'saveorder', {
      commande,
      comp,
      config,
    });

    return response.data;
  } catch (e) {
    throw Error(e);
  }
}

export async function fetchConnect() {
  try {
    const config = await connect();

    const response = await Axios.post(
      api + 'connect',

      {config},
    );
    return response.data;
  } catch (e) {
    throw Error(e);
  }
}
