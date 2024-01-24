import { base_url } from "../../../../config/api";
import { buildQueryString } from "../../../../helpers/buildQueryString";

export async function teste() {
  const queryString = buildQueryString({ search: 'Yedder' })
  const response = await fetch(`${base_url}${queryString}`);  
  const responseJson = await response.json();
  console.log(responseJson.items[0].lastName);
}