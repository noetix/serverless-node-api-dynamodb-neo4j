Node API with DynamoDB and Neo4J
================================

This is a small-scale example of an architecture I've deployed to multiple projects.


## TL;DR

We write DynamoDB event data to Neo4J using DynamoDB streams and a loader function.

`API Gateway -> Lambda -> DyanmoDB -> DynamoDB Stream -> Lamba -> Neo4J`


## Overview

Theres a bunch of microservices with their own data stores (isolated DynamoDB tables), changes to those stores are streamed to data loader (a Lambda), and a read-model is formed within Neo4J.

The data loader can load any data because DynamoDB Stream events provide keys & attribute data, as well as the intent (create, update, delete.)

More complex data loads can be added -- this is where you can add relations, relational metadata, or anything you can do in a Cypher query.

The microservices can then run Cypher queries to pull complex wholistic views.


## Run

Provided you have [serverless](https://www.npmjs.com/package/serverless) installed and configured credentials:

```
sls deploy
```

The stack output will include endpoint locations, and details to access Neo4j browser.


## Example Scenario

There are two models that are usually kept separate, `User` and `Post`.

Create a user, and make some posts by that user. Use the `GET` endpoints to pull some "complex" data.


## Endpoints

* `POST /users` creates a user profile
* `GET /users` lists all users with latest post
* `POST /posts` creates a post
* `GET /posts` lists all posts with user


## Sample Requests

Replace `{{ServiceEndpoint}}` with the endpoint given from your stack output.

Add a user:

```
curl -X POST \
  {{ServiceEndpoint}}/users \
  -H 'Content-Type: application/json' \
  -d '{
    "id": "9fa50522-e08f-440f-9f95-cf53fa79f90c",
	"name": "Alex"
  }'
```

Add a post:

```
curl -X POST \
  {{ServiceEndpoint}}/posts \
  -H 'Content-Type: application/json' \
  -d '{
	"user_id": "9fa50522-e08f-440f-9f95-cf53fa79f90c",
	"title": "I love serverless",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu feugiat leo, quis condimentum orci. Suspendisse vitae varius sapien. Cras non odio eget sem vehicula faucibus faucibus at massa. Curabitur et lacus blandit, lobortis eros eget, lacinia urna. Proin sed dictum orci. Integer pulvinar lectus justo, sit amet sodales diam sagittis a. Vivamus ut luctus lectus. Vestibulum ac diam scelerisque nisl malesuada tincidunt non in odio. Etiam et enim massa. Quisque sollicitudin ullamcorper orci, sit amet rutrum quam congue sit amet. Aliquam lacinia lectus justo. Cras at ex luctus, semper ligula non, mattis nisl."
  }'
```

Get posts:

```
curl -X GET {{ServiceEndpoint}}/posts
```

Get users:

```
curl -X GET {{ServiceEndpoint}}/users
```
