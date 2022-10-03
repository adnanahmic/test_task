import { useQuery } from "react-query";
import {  getArticlesApi, } from "./api";

export const useGetArticles = () => {
    return useQuery(['Articles'], () =>
        getArticlesApi(),
    )
}
