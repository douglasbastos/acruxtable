.SILENT:

PROJECT_NAME := $(shell python ./setup.py --name)
PROJECT_PATH := '_project'
VIRTUALENV_DIR := '.env'

# See https://gist.github.com/prwhite/8168133#comment-1313022
## Help screen
help:
	echo
	printf "Targets available:\n\n"
	awk '/^[a-zA-Z\-\_0-9]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")-1); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf "%-30s %s\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)
	echo

## Clean up build files
clean:
	echo "Cleaning up..."
	find . -name '*.pyc' -exec rm -rf {} \;
	echo "✔ done!"

## Project setup
setup: setup_python setup_project clean migrate createsuperuser execute_dump

## Python dependencies setup
setup_python:
	if [ ! $$(which virtualenv) ]; then echo "✖ installing virtualenv..."; pip install virtualenv; else echo "✔ virtualenv"; fi
	test -s ${VIRTUALENV_DIR}/bin/activate && echo "✔ env"; virtualenv ${VIRTUALENV_DIR}

## Setup testproject
setup_project:
	source ${VIRTUALENV_DIR}/bin/activate && PIP_REQUIRE_VIRTUALENV=true pip install -e .

## Output installed python packages in requirements format
pipfreeze:
	source ${VIRTUALENV_DIR}/bin/activate && PIP_REQUIRE_VIRTUALENV=true pip freeze

## Run migrate
migrate:
	source ${VIRTUALENV_DIR}/bin/activate && python ${PROJECT_PATH}/manage.py migrate

## Run migrate for tests
migrate_tests:
	source ${VIRTUALENV_DIR}/bin/activate && python ${PROJECT_PATH}/manage.py migrate --settings=settings_test

## Create superuser
createsuperuser:
	source ${VIRTUALENV_DIR}/bin/activate && python ${PROJECT_PATH}/manage.py createsuperuser

## Execute dump emails
execute_dump:
	source ${VIRTUALENV_DIR}/bin/activate && python ${PROJECT_PATH}/manage.py execute_dump

## Run server
run:
	source ${VIRTUALENV_DIR}/bin/activate && python ${PROJECT_PATH}/manage.py runserver 0.0.0.0:8000

## Run testing tasks
test: clean createdb_tests migrate_tests createsuperuser
	source ${VIRTUALENV_DIR}/bin/activate && py.test -random

## Django admin shell command
shell:
	source ${VIRTUALENV_DIR}/bin/activate && python ${PROJECT_PATH}/manage.py shell
