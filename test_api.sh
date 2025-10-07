#!/bin/bash

BASE_URL="http://localhost:5000"

get_product_id() {
  curl -s "$BASE_URL/api/products" | jq -r '.[0]._id'
}

test_endpoint() {
  local endpoint=$1
  local expected=$2
  local method=${3:-GET}
  local data=$4

  if [ "$method" = "POST" ] || [ "$method" = "PUT" ]; then
    status=$(curl -s -o /dev/null -w "%{http_code}" -X "$method" -H "Content-Type: application/json" -d "$data" "$BASE_URL$endpoint")
  else
    status=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$endpoint")
  fi

  echo "$method $endpoint -> $status (expected $expected)"
}

p=$(get_product_id)

test_endpoint "/" 200
test_endpoint "/api/products" 200

test_endpoint "/api/checkout" 400 POST "{}"
test_endpoint "/api/checkout" 400 POST "{\"items\": []}"
test_endpoint "/api/checkout" 200 POST "{
  \"items\": [
    {\"productId\": \"$p\", \"quantity\": 1}
  ]
}"
test_endpoint "/api/invalid" 404
