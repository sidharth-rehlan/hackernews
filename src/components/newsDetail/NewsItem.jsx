import React from "react";
import { timeSince } from "../../helper";

function NewsItem(props) {
  const source = props.source
    ? props.source.match(
        /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/
      )[1]
    : null;

  //const timeZoneDiff = 5.5 * 60 * 60 * 1000;
  const formatedTime = timeSince(new Date(props.createdAt));

  return (
    <tr>
      <td>{props.sno}</td>
      <td>{props.comments}</td>
      <td>{props.voteUp}</td>
      <td className="newsItem-voteUp-td">
        <a
          className="newsItem-voteUp-button"
          role="button"
          onClick={() => {
            props.onVoteUp(props.id);
          }}
        ></a>
      </td>
      <td>
        {props.detail}
        <span className="newsItem-source-url">({source})</span>
        <span className="newsItem-author"> by {props.author}</span>
        <span className="newsItem-time"> {formatedTime} ago</span>
        <span
          role="button"
          className="newsItem-hide"
          onClick={() => {
            props.onHideNews(props.id);
          }}
        >
          [Hide]
        </span>
      </td>
    </tr>
  );
}

export default NewsItem;
