#!/bin/bash

BASE_URL="http://localhost:5000"
PASS=0
FAIL=0

test_endpoint() {
    local name=$1
    local endpoint=$2
    local expected=$3
    local method=${4:-GET}
    local data=$5

    echo "Test: $name"

    if [ "$method" = "POST" ] || [ "$method" = "PUT" ]; then
        status=$(curl -s -o /dev/null -w "%{http_code}" -X "$method" -H "Content-Type: application/json" -d "$data" "$BASE_URL$endpoint")
    else
        status=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$endpoint")
    fi

    if [ "$status" -eq "$expected" ]; then
        echo "  PASS ($status)"
        ((PASS++))
    else
        echo "  FAIL (expected $expected, got $status)"
        ((FAIL++))
    fi
}

get_product_id() {
    curl -s "$BASE_URL/api/products" | jq -r '.[0]._id'
}

echo "Starting basic API tests..."

test_endpoint "Get all products" "/api/products" 200

PRODUCT_ID=$(get_product_id)
if [ -n "$PRODUCT_ID" ] && [ "$PRODUCT_ID" != "null" ]; then
    test_endpoint "Get specific product" "/api/products/$PRODUCT_ID" 200
else
    echo "No product available to test GET by ID"
    ((FAIL++))
fi

test_endpoint "Invalid product ID" "/api/products/invalid_id" 404
test_endpoint "Non-existent ID" "/api/products/68e2da3578535d896090ba99" 404

echo ""
echo "Tests complete."
echo "Passed: $PASS"
echo "Failed: $FAIL"

if [ "$FAIL" -eq 0 ]; then
    echo "All tests passed."
    exit 0
else
    echo "Some tests failed."
    exit 1
fi
