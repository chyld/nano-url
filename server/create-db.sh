#!/bin/bash

rm data.db
sqlite3 data.db <schema.sql
sqlite3 data.db "INSERT INTO urls (num) VALUES ('100000000000')"
sqlite3 -header data.db "SELECT * FROM urls"
