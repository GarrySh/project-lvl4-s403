start:
	node dist/bin/slack.js

start.dev:
	npx nodemon --exec npx babel-node server/bin/slack.js

install:
	npm install

build:
	rm -rf dist
	npm run build

test:
	npm test

check-types:
	npx flow

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test
