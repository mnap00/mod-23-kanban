import uuid from 'uuid';

import Lane from '../models/lane';

export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lanes });
  });
}

export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);
  newLane.notes = [];
  newLane.id = uuid();

  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

export function deleteLane(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }

    lane.remove(() => {
      res.status(200).end();
    });
  });
}

export function renameLane(req, res) {
  if (!req.body.name) {
    res.status(400).end();
  }

  Lane.findOneAndUpdate({ id: req.params.laneId },
    { $set: { name: req.body.name }},
    { new: true },
    (err, lane) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ lane });
    });
}
