import React from "react";

const DashboardLoading = () => {
  return (
    <div className="animate-pulse gap-4 flex-col items-center">
      <div className="flex items-center w-full">
        <div className="h-8 w-8 bg-gray-400 rounded-full"></div>
        <div className="ml-2 h-8 w-full bg-gray-400 rounded-full"></div>
      </div>
      <div className="h-4 w-[50%] bg-gray-400 my-2 rounded-full"></div>
      <div className="h-4 w-[70%] bg-gray-400 my-2 rounded-full"></div>
        <div className="h-4 w-[80%] bg-gray-400 my-2 rounded-full"></div>
        <div className="h-4 w-[60%] bg-gray-400 my-2 rounded-full"></div>
        <div className="h-4 w-[40%] bg-gray-400 my-2 rounded-full"></div>
        <div className="h-4 w-[90%] bg-gray-400 my-2 rounded-full"></div>
        <h2 className="text-gray-400 text-2xl font-bold">Loading ... </h2>
        <p className="text-gray-400">The shouldn&apos;t take long :)</p>
    </div>
  );
};

export default DashboardLoading;
