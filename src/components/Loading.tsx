import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center mt-6">
      <div className="animate-spin rounded-full h-4 w-4 border-t-3 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Loading;
