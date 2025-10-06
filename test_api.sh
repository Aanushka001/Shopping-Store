#!/bin/bash

echo "Testing Shopping Cart API"

BASE_URL="http://localhost:5000"
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

get_product_id() {
    curl -s "$BASE_URL/api/products" | jq -r '.[0]._id'
}

test_endpoint() {
    local endpoint=$1
    local expected_status=$2
    local method=$3
    local data=$4
    
    if [ "$method" = "POST" ]; then
        response=$(curl -s -o response.json -w "%{http_code}" -X POST -H "Content-Type: application/json" -d "$data" "$BASE_URL$endpoint")
    else
        response=$(curl -s -o response.json -w "%{http_code}" "$BASE_URL$endpoint")
    fi
    
    if [ "$response" -eq "$expected_status" ]; then
        echo -e "${GREEN}PASS${NC}: $method $endpoint - Status $response"
        if [ -f response.json ]; then
            rm response.json
        fi
        return 0
    else
        echo -e "${RED}FAIL${NC}: $method $endpoint - Expected $expected_status, got $response"
        if [ -f response.json ]; then
            rm response.json
        fi
        return 1
    fi
}

product_id=$(get_product_id)

echo "Testing Basic Endpoints"
test_endpoint "/" 200 GET
test_endpoint "/api/health" 200 GET
test_endpoint "/api/products" 200 GET
test_endpoint "/api/products/$product_id" 200 GET
test_endpoint "/api/products/invalid_id" 404 GET

echo "Testing Cart Operations"
test_endpoint "/api/cart" 200 GET
test_endpoint "/api/cart" 200 POST "{\"productId\": \"$product_id\", \"quantity\": 1}"
test_endpoint "/api/cart" 200 GET
test_endpoint "/api/cart/999999" 404 PUT "{\"quantity\": 5}"

echo "Testing Orders"
test_endpoint "/api/orders" 200 GET
test_endpoint "/api/orders/999" 404 GET

echo "Testing Checkout"
test_endpoint "/api/checkout" 400 POST "{}"
test_endpoint "/api/checkout" 400 POST "{\"items\": []}"
test_endpoint "/api/checkout" 201 POST "{
    \"items\": [
        {\"productId\": \"$product_id\", \"quantity\": 1}
    ],
    \"customerInfo\": {
        \"name\": \"Test User\",
        \"email\": \"test@example.com\"
    }
}"

echo "Verify Orders After Checkout"
test_endpoint "/api/orders" 200 GET

echo "Test Invalid Routes"
test_endpoint "/api/invalid" 404 GET
test_endpoint "/api/checkout" 404 GET

echo "Testing completed"