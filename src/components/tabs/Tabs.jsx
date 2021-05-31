import React from "react";

function Tabs(props) {
  return (
    <>
      <div className="tab">
        <button
          className={
            "tab-links " +
            (props.activeTab === "newsList" ? "tab-links--active" : "")
          }
          onClick={() => props.onTabClick("newsList")}
        >
          News List
        </button>
        <button
          className={
            "tab-links " +
            (props.activeTab === "voteChart" ? "tab-links--active" : "")
          }
          onClick={() => props.onTabClick("voteChart")}
        >
          Vote Up Chart
        </button>
      </div>
    </>
  );
}

export default Tabs;
