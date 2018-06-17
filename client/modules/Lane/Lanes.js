import React, { PropTypes } from 'react';
import LaneContainer from './LaneContainer.js';

const Lanes = ({ lanes }) => {
  return (
    <div className="lanes">{lanes.map(lane =>
      <LaneContainer className="lane" key={lane.id} lane={lane} />
    )}</div>
  );
};

Lanes.propTypes = {
  lanes: PropTypes.array,
};

export default Lanes;
