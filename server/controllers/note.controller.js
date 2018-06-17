import uuid from 'uuid';

import Note from '../models/note';
import Lane from '../models/lane';

export function addNote(req, res) {
  const { note, laneId } = req.body;

  if (!note || !note.task || !laneId) {
    res.status(400).end();
  }

  const newNote = new Note({
    task: note.task,
  });

  newNote.id = uuid();
  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }

    Lane.findOne({ id: laneId })
      .then(lane => {
        lane.notes.push(saved);
        return lane.save();
      })
      .then(() => {
        res.json(saved);
      });
  });
}

export function deleteNote(req, res) {
  Note.findOne({ id: req.params.noteId }).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
    }

    note.remove(() => {
      res.status(200).end();
    });
  });
}

export function editNote(req, res) {
  if (!req.body.task) {
    res.status(400).end();
  }

  Note.findOneAndUpdate({ id: req.params.noteId },
    { $set: { task: req.body.task } },
    { new: true },
    (err, note) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ note });
    });
}
