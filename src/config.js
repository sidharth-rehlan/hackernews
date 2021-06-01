const config = {
  newsFeed: "api/v1/search?tags=front_page",
  baseUrl: process.env.REACT_APP_API_ENDPOINT,
  localStorage: {
    keys: {
      hideInfo: "hideInfo", upVote: "upVote"
    }
  }
};

export default config;
