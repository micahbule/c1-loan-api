#!/bin/bash
echo "Running migrations..."
pnpm run migrate:up & PID=$!
wait $PID

echo "Starting production server..."
node dist/main & PID=$!
wait $PID