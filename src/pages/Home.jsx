import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useLocation } from "react-router";
import axios from "axios";

import NewsDetail from "../components/newsDetail";
import UpVoteChart from "../components/upVoteChart/UpVoteChart";
import Loader from "../ui/Loader";
import config from "../config";
import Tabs from "../components/tabs/Tabs";

function Home() {
  const [pagination, setPagination] = useState({});
  const [news, setNews] = useState([]);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("newsList");
  const [loading, setLoading] = useState(false);

  const page =
    location.search !== ""
      ? new URLSearchParams(location.search).get("page")
      : null;

  const pageQuery = useMemo(() => {
    return page !== null ? `&page=${page}` : null;
  }, [page]);

  /**
   * Fetching news feed
   * @returns
   */
  const fetchNewsFeed = async () => {
    setLoading(true);
    const response = await axios.get(
      `${config.baseUrl}${config.newsFeed}${pageQuery}`
    );
    if (response.status === 200) {
      setLoading(false);
      return response.data;
    }
  };

  useEffect(async () => {
    let storedHideData = localStorage.getItem("hideInfo");
    let hideData = storedHideData === null ? {} : JSON.parse(storedHideData);

    let storedVoteData = localStorage.getItem("voteUp");
    let voteData = storedVoteData === null ? {} : JSON.parse(storedVoteData);

    const data = await fetchNewsFeed();
    setPagination({ currentPage: data.page, numberOfPages: data.nbPages });

    const newsData = data.hits.map((hit) => {
      const id = hit.objectID;
      const { url, created_at, title, author, num_comments } = hit;
      return {
        url,
        created_at,
        num_comments,
        title,
        id,
        author,
        isHide: !!hideData[id],
        voteUp: voteData[id] ? parseInt(voteData[id]) : hit.points,
      };
    });

    const dataSortedByVotes = newsData.sort(
      (firstItem, secondItem) => secondItem.voteUp - firstItem.voteUp
    );

    setNews(dataSortedByVotes);
  }, [pageQuery]);

  /**
   * Hide News Handler
   * @param {} id
   */
  const hideNewsHandler = useCallback(
    (id) => {
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
    },
    [news]
  );

  /**
   * Vote Up Handler
   * @param {} id
   */
  const voteUpHandler = useCallback(
    (id) => {
      let newsInfo = [...news];
      let index = newsInfo.findIndex((news) => {
        return news.id === id;
      });

      let storedVoteData = localStorage.getItem("voteUp");
      let voteData = storedVoteData === null ? {} : JSON.parse(storedVoteData);
      voteData[id] = voteData[id]
        ? voteData[id] + 1
        : newsInfo[index].voteUp + 1;

      localStorage.setItem("voteUp", JSON.stringify(voteData));
      newsInfo[index] = { ...newsInfo[index], voteUp: parseInt(voteData[id]) };
      setNews(newsInfo);
    },
    [news]
  );

  /**
   * Tab Handler
   * @param {} selection
   */
  const tabClickHandler = (selection) => {
    setActiveTab(selection);
  };

  const visibleNewsList = news.filter((item) => !item.isHide);
  console.log("render ....Home......");

  return (
    <main>
      {loading && <Loader></Loader>}
      <Tabs onTabClick={tabClickHandler} activeTab={activeTab}></Tabs>
      {visibleNewsList.length > 0 && (
        <NewsDetail
          className={activeTab === "newsList" ? "active-content" : ""}
          news={visibleNewsList}
          pagination={pagination}
          onHideNews={hideNewsHandler}
          onVoteUp={voteUpHandler}
        ></NewsDetail>
      )}
      {visibleNewsList.length > 0 && (
        <UpVoteChart
          className={activeTab === "voteChart" ? "active-content" : ""}
          news={visibleNewsList}
        ></UpVoteChart>
      )}
    </main>
  );
}
export default Home;
