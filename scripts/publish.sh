#!/bin/sh

mv ./wrangler.toml ./wrangler.backup.toml

yarn envsub ./wrangler.backup.toml ./wrangler.toml

yarn wrangler publish

mv ./wrangler.backup.toml ./wrangler.toml
