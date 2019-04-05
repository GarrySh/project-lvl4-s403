import { createSelector } from 'reselect';

const getChannels = state => state.channels;
export const channelsSelector = createSelector(
  getChannels,
  tasks => Object.values(tasks)
);

export const noop = () => {};
