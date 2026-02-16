import React from 'react';

const Loading = () => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
