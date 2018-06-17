import React, { PropTypes } from 'react';
import LaneContainer from './LaneContainer.js';

import styles from './Lanes.css';

const Lanes = ({ lanes }) => {
  return (
    <div className={styles.Lanes}>{lanes.map(lane =>
      <LaneContainer key={lane.id} lane={lane} />
    )}</div>
  );
};

Lanes.propTypes = {
  lanes: PropTypes.array,
};

export default Lanes;
