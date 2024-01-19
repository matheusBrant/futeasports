async function teste() {
  const url = "https://drop-api.ea.com/rating/fc-24?limit=1";
  const response = await fetch(url);  
  const responseJson = await response.json();
  console.log(JSON.stringify(responseJson.items));
}
teste()