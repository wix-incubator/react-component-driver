all: test

./node_modules/.bin/npm-packlist:
	npm install

react-component-driver.tgz: $(call package_file_list, react-component-driver)
	$(MAKE) -C react-component-driver
	cp react-component-driver/react-component-driver.tgz .

redux-component-driver.tgz: $(call package_file_list, redux-component-driver)
	$(MAKE) -C redux-component-driver
	cp redux-component-driver/redux-component-driver.tgz .

.PHONY: clean test publish

clean:
	$(MAKE) -C react-component-driver clean
	$(MAKE) -C redux-component-driver clean
	rm -rf node_modules
	rm -f package-lock.json
	rm -f *.tgz

test: ./node_modules/.bin/npm-packlist react-component-driver.tgz redux-component-driver.tgz
	$(MAKE) -C example-app clean test
	$(MAKE) -C example-redux-app clean test
	$(MAKE) -C example-remx-app clean test

publish:
	$(MAKE) -C react-component-driver publish
	$(MAKE) -C redux-component-driver publish

define package_name_from_tgz
	$(shell echo $(1) | grep -o '^[a-z-]\+[a-z]\+')
endef

define package_file_list
	$(shell ./node_modules/.bin/npm-packlist $(1) | sed -e 1d -e "s#.*#$(1)/&#")
endef
