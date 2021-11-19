const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);
  //the url is obtained by running kubectl get services command and noting down the cluster ip service name
  axios
    .post('http://posts-cluster-ip-service:4000/events', event)
    .catch((err) => {
      console.log(err.message);
    });
  axios
    .post('http://comments-cluster-ip-service:4001/events', event)
    .catch((err) => {
      console.log(err.message);
    });
  axios
    .post('http://query-cluster-ip-service:4002/events', event)
    .catch((err) => {
      console.log(err.message);
    });
  axios
    .post('http://moderation-cluster-ip-service:4003/events', event)
    .catch((err) => {
      console.log(err.message);
    });
  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Event Bus: Listening on 4005');
});
