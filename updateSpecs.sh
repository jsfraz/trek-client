#!/bin/sh
npm install -g ng-openapi-gen
ng-openapi-gen --input http://localhost:8080/api/openapi.json --output src/app/api