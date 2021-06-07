import axios from 'axios';
import urls from './urls';

export default async function post(request = {}) {
  const { simulationData } = urls;
  const response = await axios.post(simulationData, request);
  return response;
}

export async function postPID(request = {}) {
  const { simulationPID } = urls;
  const response = await axios.post(simulationPID, request);
  return response;
}

export async function postFuzzy(request = {}) {
  const { simulationFuzzy } = urls;
  const response = await axios.post(simulationFuzzy, request);
  return response;
}
