FROM node:21-alpine

COPY . /app

# Install Python and build tools
RUN apk add --no-cache python3 make gcc g++ libc-dev

# Set Python path for npm
ENV PYTHON=/usr/bin/python3

RUN cd /app \
    && yarn install \
    && npx zx /app/scripts/init.mjs --chain=darwinia \
    && yarn codegen

WORKDIR /app

ENTRYPOINT ["/app/scripts/entrypoint.sh"]
