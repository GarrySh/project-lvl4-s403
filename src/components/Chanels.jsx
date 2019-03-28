import React from 'react';

const renderChanels = channels => channels.map(({ id, name }) => <div key={id}>{name}</div>);

const Chanels = props => {
  console.log('chanels props', props);
  const {
    gon: { channels },
  } = props;

  return (
    <>
      <h2>Chanels</h2>
      {renderChanels(channels)}
    </>
  );
};

export default Chanels;
