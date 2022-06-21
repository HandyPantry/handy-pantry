#!/usr/bin/env bash

seed_db="${MONGO_DB:-dev}"
echo Dropping DB $seed_db
mongo "$seed_db" --eval "db.dropDatabase()"
mongo "$seed_db" --eval "db.getCollection('products').createIndex({category: 1, store: 1})"
mongo "$seed_db" --eval "db.getCollection('pantry').createIndex({product: 1})"
mongo "$seed_db" --eval "db.getCollection('shoppinglist').createIndex({\"products.location\": 1})"
for file in "$(dirname "$BASH_SOURCE")"/seed/*.json; do
  if [[ -f "$file" ]]; then
    echo Seeding $(basename "$file" ".json") from $file in DB $seed_db
    mongoimport --db="$seed_db" --collection="$(basename "$file" ".json")" --file="$file" --jsonArray
  fi
done
