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
        <span
          className="newsItem-voteUp-button cursor-pointer"
          role="button"
          title="UpVote"
          onClick={() => {
            props.onVoteUp(id);
          }}
        />
      </td>
      <td>
        {title}
        <span className="newsItem-source-url">
          (<a href={url}>{source}</a>)
        </span>
        <span className="newsItem-author"> by {author}</span>
        <span className="newsItem-time"> {formatedTime} ago</span>
        <span
          role="button"
          title="Hide"
          className="newsItem-hide cursor-pointer"
          onClick={() => {
            props.onHideNews(id);
          }}
        >
          [Hide]
        </span>
      </td>
    </tr>
  );
}

export default React.memo(NewsItem);
