package_name := redux-component-driver
target := $(package_name).tgz

sources := $(shell ../node_modules/.bin/npm-packlist . | tail -n +2 | grep -v ^dist)

all: $(target)

$(target): $(sources)
	$(call set_dev_version)
	npm install
	npm test
	npm pack .
	mv $(package_name)-`jq -r .version package.json`.tgz $(package_name).tgz

.PHONEY: clean publish

clean:
	rm -r node_modules
	rm *.tgz

publish: $(target)
	$(call set_production_version)
	npm publish

define set_dev_version
	cp package.json package.json.bak
	jq "setpath([\"dependencies\", \"react-component-driver\"]; \"file:../react-component-driver.tgz\")" package.json.bak > package.json
	rm package.json.bak
endef

define set_production_version
	cp package.json package.json.bak
	jq "setpath([\"dependencies\", \"react-component-driver\"]; \"$(shell jq -r .version node_modules/react-component-driver/package.json)\")" package.json.bak > package.json
	rm package.json.bak
endef
