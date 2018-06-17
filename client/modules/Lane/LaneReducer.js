// Import Actions
import {
  CREATE_LANES,
  CREATE_LANE,
  UPDATE_LANE,
  DELETE_LANE,
  EDIT_LANE,
} from './LaneActions';
import {
  CREATE_NOTE,
  DELETE_NOTE,
  MOVE_WITHIN_LANE,
} from '../Note/NoteActions';

import omit from 'lodash/omit';

function moveNotes(array, sourceNoteId, targetNoteId) {
  const sourceIndex = array.indexOf(sourceNoteId);
  const targetIndex = array.indexOf(targetNoteId);
  const arrayCopy = [...array];
  arrayCopy.splice(targetIndex, 0, arrayCopy.splice(sourceIndex, 1)[0]);
  return arrayCopy;
}

// Initial State
const initialState = {};

const LaneReducer = (state = initialState, action) => {
  switch (action.type) {

    case CREATE_LANES:
      return { ...action.lanes };

    case CREATE_LANE:
    case UPDATE_LANE:
      return { ...state, [action.lane.id]: action.lane };

    case DELETE_LANE:
      return omit(state, action.laneId);

    case EDIT_LANE: {
      const lane = { ...state[action.laneId], editing: true };
      return { ...state, [action.laneId]: lane };
    }

    case CREATE_NOTE: {
      const newLane = { ...state[action.laneId] };
      newLane.notes = newLane.notes.concat(action.note.id);
      return { ...state, [action.laneId]: newLane };
    }

    case DELETE_NOTE: {
      const newLane = { ...state[action.laneId] };
      newLane.notes = newLane.notes.filter(noteId => noteId !== action.noteId);
      return { ...state, [action.laneId]: newLane };
    }

    case MOVE_WITHIN_LANE: {
      const newLane = { ...state[action.laneId] };
      newLane.notes = moveNotes(
        newLane.notes, action.sourceId, action.targetId);
      return { ...state, [action.laneId]: newLane };
    }

    default:
      return state;
  }
};

export default LaneReducer;
