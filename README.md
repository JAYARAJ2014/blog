# Minimalistic Micro Services Example NodeJS

apis

- posts => Represents a blog post.
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
