# Makefile. nestjs-seed

install:
	npm install
run-migrations:
	npm run-script typeorm migration:run
run-dev:
	npm run start:dev
run-tests:
	npm run test
run-prod:
	npm run start:prod
run-cluster:
	pm2 start dist/main.js -i max
stop-cluster:
	pm2 stop main
delete-cluster:
	pm2 delete main
doc:
	npx @compodoc/compodoc -p tsconfig.json -s

