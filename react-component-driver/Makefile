package_name := react-component-driver
target := $(package_name).tgz

sources := $(shell ../node_modules/.bin/npm-packlist . | tail -n +2 | grep -v ^dist)

all: $(target)

$(target): $(sources)
	npm install
	npm test
	npm pack .
	mv $(package_name)-`jq -r .version package.json`.tgz $(package_name).tgz

.PHONEY: clean publish

clean:
	rm -rf node_modules
	rm -f package-lock.json
	rm -f *.tgz

publish: $(target)
	npm publish
