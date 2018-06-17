import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';

import ItemTypes from '../Kanban/itemTypes';

// Import Style
import styles from './Note.css';

class Note extends Component {
  render() {
    const { connectDragSource, isDragging, editing, children } = this.props;
    // no dragging when editing component
    const dragSource = editing ? a => a : connectDragSource;

    return dragSource(
      <li
        className={styles.Note}
        style={{ opacity: isDragging ? 0 : 1 }}
      >
        {children}
      </li>
    );
  }
}

Note.propTypes = {
  connectDragSource: PropTypes.func,
  isDragging: PropTypes.bool,
  editing: PropTypes.bool,
  children: PropTypes.any,
};

const noteSource = {
  beginDrag(props) {
    return {
      id: props.id,
      laneId: props.laneId,
    };
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  },
};

export default DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(Note);
