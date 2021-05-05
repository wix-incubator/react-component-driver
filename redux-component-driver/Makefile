package_name := redux-component-driver
target := $(package_name).tgz

sources := $(shell ../node_modules/.bin/npm-packlist . | tail -n +2 | grep -v ^dist)

all: $(target)

$(target): mock $(sources)
	npm install
	npm test
	npm pack .
	mv $(package_name)-`jq -r .version package.json`.tgz $(package_name).tgz

.PHONEY: clean publish mock unmock

mock:
	cp package.json package.json.bak
	jq "setpath([\"dependencies\", \"react-component-driver\"]; \"file:../react-component-driver.tgz\")" package.json.bak > package.json
	rm package.json.bak

unmock:
	cp package.json package.json.bak
	jq "setpath([\"dependencies\", \"react-component-driver\"]; \"`jq -r .version ../react-component-driver/package.json`\")" package.json.bak > package.json
	rm package.json.bak

clean:
	rm -rf node_modules
	rm -f package-lock.json
	rm -f *.tgz

publish: $(target) unmock
	npm publish
