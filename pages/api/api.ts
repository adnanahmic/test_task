import axios from "axios";
import { Data } from "../../Interfaces/interfaces";

export async function getArticlesApi() {
    const data: Data = await axios.get("https://www.alpha-orbital.com/last-100-news.json")
        .then((res) => res);
    return data?.data
}

