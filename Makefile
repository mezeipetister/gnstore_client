
.PHONY: release, build, dev, serve, docker, release_docker, docker_push

release:
	ng build --prod --outputPath=dist

release_docker: release docker docker_push

build:
	ng build --outputPath=dist

docker:
	docker build -t mezeipetister/gnstore_client:latest .

docker_push:
	docker push mezeipetister/gnstore_client:latest

dev:
	ng serve

serve: dev