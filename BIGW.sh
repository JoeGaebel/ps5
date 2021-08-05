
getAvail() {
  response=$(curl 'https://api.bigw.com.au/api/availability/v0/product/124625?storeId=0117&deliveryPostcode=2060&deliverySuburb=MCMAHONS%20POINT'  \
   -H 'authority: api.bigw.com.au'    \
   -H 'sec-ch-ua: "Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"'    \
   -H 'accept: application/json, text/plain, */*'    \
   -H 'dnt: 1'    \
   -H 'sec-ch-ua-mobile: ?0'    \
   -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36'    \
   -H 'origin: https://www.bigw.com.au'    \
   -H 'sec-fetch-site: same-site'    \
   -H 'sec-fetch-mode: cors'    \
   -H 'sec-fetch-dest: empty'    \
   -H 'referer: https://www.bigw.com.au/'    \
   -H 'accept-language: en-US,en;q=0.9' \
   --compressed --silent)

   echo "$(echo $response | jq)"

   value=$(echo $response | jq '.products."124625" | to_entries | .. | select(.available? == true)' | wc -l | tr -d ' ')
   return $value
}

freakOut() {
  while true; do
    echo -en "\007"
    echo 'https://www.bigw.com.au/product/playstation-5-console/p/124625/'
    sleep 0.1
  done
}

x=0
getAvail
while [ $? -eq 0 ]; do
  ((x+=1))
  echo "Nope.... attempt: $x"
  sleep 60
  getAvail
done
freakOut
