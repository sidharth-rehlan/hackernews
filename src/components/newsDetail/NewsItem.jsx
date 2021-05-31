import React from "react";
import moment from "moment";

function NewsItem(props) {
  console.log("render ....news item......");

  const { num_comments, title, author, url, created_at, id, voteUp } =
    props.news;

  const source = url
    ? url.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/)[1]
    : null;
  const formatedTime = moment(new Date(created_at)).fromNow();

  return (
    <tr>
      <td>{props.sno}</td>
      <td>{num_comments}</td>
      <td>{voteUp}</td>
      <td className="newsItem-voteUp-td">
        <a
          className="newsItem-voteUp-button"
          role="button"
          onClick={() => {
            props.onVoteUp(id);
          }}
        ></a>
      </td>
      <td>
        {title}
        <span className="newsItem-source-url">({source})</span>
        <span className="newsItem-author"> by {author}</span>
        <span className="newsItem-time"> {formatedTime} ago</span>
        <a
          role="button"
          className="newsItem-hide"
          onClick={() => {
            props.onHideNews(id);
          }}
        >
          [Hide]
        </a>
      </td>
    </tr>
  );
}

export default React.memo(NewsItem);
