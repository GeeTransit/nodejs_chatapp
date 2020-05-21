# Licensed under MIT.
# Copyright (2016) by Kevin van Zonneveld https://twitter.com/kvz
# Link: https://gist.github.com/kvz/79554af7f2d1b1379536

define npm_script_targets
TARGETS := $(shell node -e 'for (var k in require("./package.json").scripts) {console.log(k.replace(/:/g, "-"));}')
$$(TARGETS):
	npm run $(subst -,:,$(MAKECMDGOALS))

.PHONY: $$(TARGETS)
endef

$(eval $(call npm_script_targets))
