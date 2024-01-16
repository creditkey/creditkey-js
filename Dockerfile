FROM --platform=linux/amd64 node:14.19-alpine

RUN apk update && apk add \
  python3 \
  make \
  g++ \
&& rm -rf /var/cache/apk/*;

WORKDIR /creditkey/creditkey-js
COPY . .
ARG FONTAWESOME_NPM_AUTH_TOKEN
ENV FONTAWESOME_NPM_AUTH_TOKEN $FONTAWESOME_NPM_AUTH_TOKEN

#RUN yarn install -std=c++17
RUN yarn install
RUN yarn build
# NODE_OPTIONS=--openssl-legacy-provider
