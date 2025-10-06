#!/bin/bash

BASE_URL="http://localhost:5000"

get_product_id() {
  curl -s "$BASE_URL/api/products" | jq -r '.[0]._id'
}

test() {
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

test "/" 200
test "/api/health" 200
test "/api/products" 200
test "/api/products/$p" 200
test "/api/products/invalid_id" 404

test "/api/cart" 200
test "/api/cart" 200 POST "{\"productId\": \"$p\", \"quantity\": 1}"
test "/api/cart/999999" 404 PUT "{\"quantity\": 5}"

test "/api/orders" 200
test "/api/orders/999" 404

test "/api/checkout" 400 POST "{}"
test "/api/checkout" 400 POST "{\"items\": []}"
test "/api/checkout" 201 POST "{
  \"items\": [
    {\"productId\": \"$p\", \"quantity\": 1}
  ],
  \"customerInfo\": {\"name\": \"Test\", \"email\": \"t@e.com\"}
}"

test "/api/orders" 200
test "/api/invalid" 404
test "/api/checkout" 404
