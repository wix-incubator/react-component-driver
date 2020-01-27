package_name := redux-component-driver
target := $(package_name).tgz

sources := $(shell ../node_modules/.bin/npm-packlist . | tail -n +2 | grep -v ^dist)

all: $(target)

$(target): $(sources)
	cp package.json package.json.bak
	jq "setpath([\"dependencies\", \"react-component-driver\"]; \"file:../react-component-driver.tgz\")" package.json.bak > package.json
	npm install
	npm test
	npm pack .
	mv $(package_name)-`jq -r .version package.json`.tgz $(package_name).tgz

.PHONEY: clean

clean:
	rm -rf node_modules
	rm *.tgz
	mv package.json.bak package.json
