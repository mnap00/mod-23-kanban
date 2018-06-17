import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';

import ItemTypes from '../Kanban/itemTypes';

// Import Style
import styles from './Note.css';

class Note extends Component {
  render() {
    const {
      connectDragSource,
      connectDropTarget,
      isDragging,
      editing,
      children,
    } = this.props;
    // no dragging when editing component
    const dragSource = editing ? a => a : connectDragSource;

    return dragSource(connectDropTarget(
      <li
        className={styles.Note}
        style={{ opacity: isDragging ? 0 : 1 }}
      >
        {children}
      </li>
    ));
  }
}

Note.propTypes = {
  connectDragSource: PropTypes.func,
  connectDropTarget: PropTypes.func,
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

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    if (targetProps.id !== sourceProps.id) {
      targetProps.moveWithinLane(
        targetProps.laneId, targetProps.id, sourceProps.id);
    }
  },
};

export default compose(
  DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
    connecDropTarget: connect.dropTarget(),
  })),
)(Note);
