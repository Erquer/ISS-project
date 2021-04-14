import axios from 'axios';
import urls from './urls';

export default async function post(request = {}) {
  const { simulationData } = urls;
  const response = await axios.post(simulationData, request);
  return response;
}
