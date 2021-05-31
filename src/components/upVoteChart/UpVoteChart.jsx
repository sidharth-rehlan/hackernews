import React from "react";
import { Chart } from "react-charts";
import "./style.scss";

function UpVoteChart(props) {
  const chartDate = props.news.map((newsItem, index) => {
    return { primary: index + 1, secondary: parseInt(newsItem.voteUp) };
  });

  const data = [
    {
      label: "Up Votes",
      data: chartDate,
    },
  ];

  const axes = [
    { primary: true, type: "linear", position: "bottom" },
    { type: "linear", position: "left" },
  ];

  return (
    <section className={`upVoteChart ${props.className}`}>
      <Chart data={data} axes={axes} tooltip />
    </section>
  );
}

export default UpVoteChart;
