import React from "react";
import NewsItem from "./NewsItem";
import Pagination from "../common/pagination";
import "./style.scss";

function NewsDetail(props) {
  return (
    <section className={`newsDetails ${props.className}`}>
      <table className="newsDetails-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Comments</th>
            <th>Vote #</th>
            <th>Upvote</th>
            <th>News Details</th>
          </tr>
        </thead>
        <tbody>
          {props.news.map((newsItem, index) => {
            return (
              <NewsItem
                key={newsItem.id}
                sno={index + 1}
                news={newsItem}
                onHideNews={props.onHideNews}
                onVoteUp={props.onVoteUp}
              ></NewsItem>
            );
          })}
        </tbody>
      </table>

      <Pagination pagination={props.pagination}></Pagination>
    </section>
  );
}

export default React.memo(NewsDetail);
