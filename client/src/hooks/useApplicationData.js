import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

const [state, setState] = useState('');

const attractionsUrl = "/api/trend/location";
const getData = async () => {
  const { data } = await axios.get(attractionsUrl);
  setState(data);
  console.log(state[0]);
};
useEffect(() => {
  getData();
}, []);
  return { state };
}