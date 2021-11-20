# Minimalistic Micro Services Example NodeJS

Characteristics

- Each microservice has its own data store (In this example we are not using database for simplicity.)
- Each service is independantly deployable and scalable (Runs on own container).
- When a post is created PostCreated event is send to event bus.
- Event bus notifies other services
- When a comment is created CommentCreated event is send to event bus
- Event bus notifies other services about CommentCreated. Initially the comment will be in moderation pending status
- When Moderation service receives CommentCreatd event from the event bus, it moderates the comment and sends a CommentModerated event back to event bus
- When comment is moderated, event bus sends CommentUpdated event to Query service.
- All the events are stored in an event data store so that query service can catch up if it goes down and comes back again.

![](images/services.png)

apis

- posts => Represents a blog post.

  - When a post is created 'PostCreated' event is send to the event-bus

- comments => Comments under a post
- moderation => A service that moderates comments
- query => service that helps to get all posts at once. This also helps event catchup
- event-bus => Every time event-bus receives the following events:

  - PostCreated - When a Post is created
  - CommentCreated - When a comment is created.
  - CommentModerated - When a comment is moderated.
  - CommentUpdated - When a comment is updated.

- query service stores a replica of all posts and also receives events from event bus on everyevent.

client - A simple barebones recat app

Each api is dockerized.

The infr/k8s folder contains kubernetes configuration yaml files.

Each yaml file defines a deployment and a ClusterIP service

Only posts api is externally exposed and hence posts-svc.yaml represents the NodePort service for posts api

Ingress-nginx controller is used to handle routes
