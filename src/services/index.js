import axios from "axios";
import config from "../config";


export const fetchNewsFeed = async (pageQuery) => {
    const response = await axios.get(
        `${config.baseUrl}${config.newsFeed}${pageQuery}`
    );

    if (response && response.status === 200) {
        return response.data;
    }
}