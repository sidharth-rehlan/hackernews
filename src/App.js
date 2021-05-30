import React, { useEffect, useState } from "react";
import axios from "axios";

import NewsDetail from "./components/newsDetail";
import UpVoteChart from "./components/upVoteChart/UpVoteChart";
import config from "./config";

import "./App.css";

function App() {
  const [pagination, setPagination] = useState({});
  const [news, setNews] = useState([]);

  const fetchNewsFeed = async () => {
    const response = await axios.get(`${config.baseUrl}${config.newsFeed}`);
    console.log("response....", response);
    if (response.status === 200) {
      console.log(response);
      return response.data;
    }
  };

  useEffect(async () => {
    let storedHideData = localStorage.getItem("hideInfo");
    let hideData = storedHideData === null ? {} : JSON.parse(storedHideData);

    let storedVoteData = localStorage.getItem("voteUp");
    let voteData = storedVoteData === null ? {} : JSON.parse(storedVoteData);

    const data = await fetchNewsFeed();
    console.log(data);
    setPagination({ currentPage: data.page, numberOfPages: data.nbPages });

    const newsData = data.hits.map((hit) => {
      const id = hit.objectID;
      return {
        url: hit.url,
        created_at: hit.created_at,
        points: hit.points,
        title: hit.title,
        id: id,
        author: hit.author,
        isHide: !!hideData[id],
        voteUp: voteData[id] ? parseInt(voteData[id]) : 1,
      };
    });
    setNews(newsData);
  }, []);

  const hideNewsHandler = (id) => {
    let storedHideData = localStorage.getItem("hideInfo");
    let hideData = storedHideData === null ? {} : JSON.parse(storedHideData);
    hideData[id] = true;
    localStorage.setItem("hideInfo", JSON.stringify(hideData));

    let newsInfo = [...news];
    let index = newsInfo.findIndex((news) => {
      return news.id === id;
    });
    newsInfo[index] = { ...newsInfo[index], isHide: hideData[id] };
    setNews(newsInfo);
  };

  const voteUpHandler = (id) => {
    let storedVoteData = localStorage.getItem("voteUp");
    let voteData = storedVoteData === null ? {} : JSON.parse(storedVoteData);
    voteData[id] = voteData[id] ? voteData[id] + 1 : 1;
    localStorage.setItem("voteUp", JSON.stringify(voteData));
    let newsInfo = [...news];
    let index = newsInfo.findIndex((news) => {
      return news.id === id;
    });
    newsInfo[index] = { ...newsInfo[index], voteUp: parseInt(voteData[id]) };
    setNews(newsInfo);
  };

  const visibleNewsList = news.filter((item) => !item.isHide);

  return (
    <main>
      {visibleNewsList.length > 0 && (
        <NewsDetail
          news={visibleNewsList}
          pagination={pagination}
          onHideNews={hideNewsHandler}
          onVoteUp={voteUpHandler}
        ></NewsDetail>
      )}
      {visibleNewsList.length > 0 && (
        <UpVoteChart news={visibleNewsList}></UpVoteChart>
      )}
    </main>
  );
}
export default App;
