import React from "react";

const DataDisplay = (props) => {
  const { figures, title, progressText, isCurrency, progressBarTitle } = props;
  return (
    <div className="flex flex-col bg-primary_bg text-white px-5 py-5 w-full h-auto rounded-xl">
      <div className="flex flex-col justify-center items-center flex-1 gap-y-5 ">
        {isCurrency ? (
          <h1 className="text-6xl">&#8369;{figures}</h1>
        ) : (
          <h1 className="text-6xl">{figures}</h1>
        )}

        <span className="text-2xl">{title}</span>
      </div>

      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-white">
          {progressBarTitle}
        </span>
        <span className="text-sm font-medium text-whtie">{progressText}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: progressText }}
        ></div>
      </div>
    </div>
  );
};

export default DataDisplay;
