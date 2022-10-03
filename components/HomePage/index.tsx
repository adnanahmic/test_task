import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

import NavBar from "./NavBar";
import SkeletonLoader from "./Skeleton";
import ConfirmationDialog from "./ConfirmationDialog";
import ErrorHandling from "./Error";
import ArticlesList from "./ArticlesList";
import { useGetArticles } from "../../pages/api/apiQueryHook";
import { IsArticle } from '../../Interfaces/interfaces';
import { BG_IMAGE } from "../../constants";

function Articles() {
    const router = useRouter();

    const searchInputEl = useRef<any>(null);

    const { data: articles, isLoading, isError } = useGetArticles(); 

    const [searchedArticle, setsearchedArticle] = useState("");
    const [uniqueSlug, setUniqueSlug] = useState("");
    const [openDeleteConfDialog, setOpenDeleteConfDialog] = useState(false);
    const [searchedArtCount, setSearchedArtCount] = useState<any>([]);
    const [removeBtnIsClicked, setRemoveBtnIsClicked] = useState<any>();
    const [filteredNavBar, setFilteredNavBar] = useState<any>();
    const [deletedNavBarItems, setDeletedNavBarItems] = useState<any>();
    const [allArts, setAllArts] = useState<any>();
    const [artCountWithoutDeleted, setArtCountWithoutDeleted] = useState<any>();
    const [searchButtonIsClicked, setSearchButtonIsClicked] = useState<any>(false)

    const filteredArticles = articles?.filter((article: IsArticle) =>
        router.route === "/x-universe" ? article.post_category_id === "1"
            : router.route === "/elite" ? article.post_category_id === "2"
                : router.route === "/starpoint-gemini" ? article.post_category_id === "3"
                    : router.route === "/eve-online" ? article.post_category_id === "4" : true);

    const convertHTMLEntityForTag = (text: string) => {
        const span = document.createElement("span");
        return text?.replace(/(<([^>]+)>)/gi, (entity: string) => {
            span.innerHTML = entity;
            return span.innerText;
        });
    };

    const convertHTMLEntityForSymbols = (text: string) => {
        const span = document.createElement("span");
        return text?.replace(/&[#A-Za-z0-9]+;/gi, (entity: string) => {
            span.innerHTML = entity;
            return span.innerText;
        });
    };

    const handleSearch = () => {
        setsearchedArticle(searchInputEl.current.value);
        setSearchButtonIsClicked(true)
    };

    const filterSearchedArticles = (article: IsArticle) => {
        return searchedArticle.length >= 3 ? article.title.toLowerCase().includes(searchedArticle.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchedArticle.toLowerCase()) : true;
    };

    const allSearchedArticles = allArts?.filter(filterSearchedArticles)?.map((el: any) => el);

    const handleClickOpenDeleteConfDialog = (slug: string) => {
        setOpenDeleteConfDialog(true);
        setUniqueSlug(slug);
    };

    const handleCloseDeleteConfDialog = () => {
        setOpenDeleteConfDialog(false);
    };

    const handleDelete = () => {
        const artsAfterDelete = allArts?.filter((article: IsArticle) => article.slug !== uniqueSlug)
        setOpenDeleteConfDialog(false);
        setAllArts(artsAfterDelete);
    };

    const handleRefetch = () => {
        window.location.reload();
    };

    const pull_data_from_NAVBAR = ({ removeBtnIsClicked, deletedNavBarItems }: any) => {
        setRemoveBtnIsClicked(removeBtnIsClicked);
        setFilteredNavBar(filteredNavBar);
        setDeletedNavBarItems(deletedNavBarItems);
    }

    const pull_data_from_ARTICLES = (articlesAfterDelete: any) => {
        setArtCountWithoutDeleted(articlesAfterDelete)
    }

    useEffect(() => {
        setAllArts(filteredArticles);
    }, [articles]);

    useEffect(() => {
        setSearchedArtCount(allSearchedArticles);
        searchButtonIsClicked === true && router.route === "/x-universe" && router.push(`/?query=${searchedArticle + '&'}filter=1`)
        searchButtonIsClicked === true && router.route === "/elite" && router.push(`/?query=${searchedArticle + '&'}filter=2`)
        searchButtonIsClicked === true && router.route === "/starpoint-gemini" && router.push(`/?query=${searchedArticle + '&'}filter=3`)
        searchButtonIsClicked === true && router.route === "/eve-online" && router.push(`/?query=${searchedArticle + '&'}filter=4`)
    }, [searchedArticle]);

    return (
        <>
            {!articles || isLoading ?
                <SkeletonLoader /> :
                !articles || isError ?
                    <ErrorHandling /> :
                    <>
                        <MainContainer>
                            <NavBar
                                pull_data_from_ARTICLES={pull_data_from_NAVBAR} />
                            {router.route !== "/article/[slug]" ?
                                <>
                                    <SearchContainer>
                                        <SearchInput
                                            ref={searchInputEl}
                                            placeholder="...search article title or excerpt..."
                                        />
                                        <SearchButton
                                            type="submit"
                                            value="SEARCH"
                                            onClick={handleSearch}
                                        />
                                    </SearchContainer>
                                    <ArtNum>Currently showing {searchedArtCount?.length !== undefined ? searchedArtCount?.length
                                        : removeBtnIsClicked ? artCountWithoutDeleted?.length
                                            : allArts?.length} articles</ArtNum>
                                    {allArts?.length < 100 && router.route === "/" ?
                                        <RefetchButton onClick={handleRefetch}>Refetch</RefetchButton>
                                        : ""}
                                </>
                                : ""
                            }
                            <ArticlesList
                                articles={articles}
                                allArts={allArts}
                                filterSearchedArticles={filterSearchedArticles}
                                handleClickOpenDeleteConfDialog={handleClickOpenDeleteConfDialog}
                                convertHTMLEntityForTag={convertHTMLEntityForTag}
                                convertHTMLEntityForSymbols={convertHTMLEntityForSymbols}
                                removeBtnIsClicked={removeBtnIsClicked}
                                deletedNavBarItems={deletedNavBarItems}
                                pull_data_from_ARTICLES={pull_data_from_ARTICLES}
                                setsearchedArticle={setsearchedArticle}
                            />
                            {searchedArtCount === undefined || [] && !searchedArticle &&
                                <SearchError>Does not match any results</SearchError>
                            }
                        </MainContainer>
                        <ConfirmationDialog
                            openDeleteConfDialog={openDeleteConfDialog}
                            handleCloseDeleteConfDialog={handleCloseDeleteConfDialog}
                            handleDelete={handleDelete}
                        />
                    </>
            }
        </>
    )
}

const SearchContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`
const SearchInput = styled.input`
    width: 60%;
    height: 52px;
    padding-left: 40px;
    font-size: 18px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;

    &:focus {
        outline: none
    }
`
const SearchButton = styled.input`
    background-color: #51ABF8;
    border: none;
    width: 8%;
    color: white;
    font-weight: bold;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    cursor: pointer
`
const ArtNum = styled.p`
    color: white;
    width: 100%;
    display: flex;
    justify-content: end;
    padding-right: 16.5%;
    margin-top: 12px
`
const RefetchButton = styled.button`
    color: white;
    background-color: #5AC002;
    width: 100px;
    height: 30px;
    float: right;
    margin-top: 12px;
    margin-right: 16.5%;
    border: none;
    font-size: 14px;
    border-radius: 8px;
    cursor: pointer;
`
const MainContainer = styled.div`
    background-image: url(${BG_IMAGE});
    max-width: 100%;  
    min-height: 100vh;
`
const SearchError = styled.p`
      color: white;
      text-align: center;
      padding-top: 50px;
      font-size: 22px
`
export default Articles