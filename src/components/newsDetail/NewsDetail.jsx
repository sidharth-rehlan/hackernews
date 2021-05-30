import React from "react";
import NewsItem from "./NewsItem";
import Pagination from "../../ui/Pagination";
import "./style.css";

function NewsDetail(props) {
  //const newsList = props.news.filter((news) => news.isHide != true);

  return (
    <section className="newsDetails">
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
                comments={newsItem.points}
                votes="233"
                detail={newsItem.title}
                author={newsItem.author}
                source={newsItem.url}
                createdAt={newsItem.created_at}
                id={newsItem.id}
                isHide={newsItem.isHide}
                voteUp={newsItem.voteUp}
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

export default NewsDetail;
