import Link from "next/link";
import moment from "moment";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { Card, CardContent } from "@mui/material";

import SingleArticle from "../SingleArticle";
import { IsArticle } from '../../Interfaces/interfaces';
import { useEffect, useState } from "react";

const ArticlesList = ({
    articles,
    allArts,
    filterSearchedArticles,
    handleClickOpenDeleteConfDialog,
    convertHTMLEntityForTag,
    convertHTMLEntityForSymbols,
    removeBtnIsClicked,
    deletedNavBarItems,
    pull_data_from_ARTICLES,
    setsearchedArticle }: any) => {

    const router = useRouter();

    const [articlesAfterDelete, setArticlesAfterDelete] = useState<any>([]);

    const deletedItems = deletedNavBarItems?.map((el: any) => el.name)

    const deleteXUniverseArticles = deletedItems?.includes("X Unverse")
        && allArts?.filter((el: any) => el.post_category_id !== "1")
    const deleteEliteArticles = deletedItems?.includes("Elite: Dangerous")
        && articlesAfterDelete?.filter((el: any) => el.post_category_id !== "2")
    const deleteStarPointArticles = deletedItems?.includes("Starpoint Gemini")
        && articlesAfterDelete?.filter((el: any) => el.post_category_id !== "3")
    const deleteEveOnlineArticles = deletedItems?.includes("EVE Online")
        && articlesAfterDelete?.filter((el: any) => el.post_category_id !== "4")

    const allArtsWithDeleted = removeBtnIsClicked !== true ? allArts : articlesAfterDelete

    const query = window.location.search.includes("query") && router.query.query
    if(query) {
        setsearchedArticle(query)
    }

    const deletedArtFuntion = () => {
        deleteXUniverseArticles !== false && setArticlesAfterDelete([...articlesAfterDelete, ...deleteXUniverseArticles])
        deleteEliteArticles !== false && setArticlesAfterDelete([...deleteEliteArticles])
        deleteStarPointArticles !== false && setArticlesAfterDelete([...deleteStarPointArticles])
        deleteEveOnlineArticles !== false && setArticlesAfterDelete([...deleteEveOnlineArticles])
    };

    pull_data_from_ARTICLES(articlesAfterDelete)

    useEffect(() => {

        removeBtnIsClicked && deletedArtFuntion()
    }, [deletedNavBarItems])

    return (
        <>
            {articles && !router.query.slug ? allArtsWithDeleted
                ?.filter(filterSearchedArticles)
                ?.map((article: IsArticle) => {
                    return (
                        <ArticlesContainer key={article.title}>
                            <MuiCard>
                                <CardContent>
                                    <Content>
                                        <Link as={`/article/${article.slug}`} href="/article/slug">
                                            <ArtImg src={`https://www.alpha-orbital.com/assets/images/post_img/${article.post_image}`} />
                                        </Link>
                                        <ArtInfo>
                                            <DeleteButton className="delete_button" onClick={() => handleClickOpenDeleteConfDialog(article.slug)}>Delete</DeleteButton>
                                            <ArtTitle>
                                                <Link as={`/article/${article.slug}`} href="/article/slug">
                                                    <TitleName>{article.title}</TitleName>
                                                </Link>
                                            </ArtTitle>
                                            <ArtDate>{moment(article.date).format("DD.MM.YYYY")}</ArtDate>
                                            <ArtExcerpt>{convertHTMLEntityForTag(convertHTMLEntityForSymbols(article.excerpt))}</ArtExcerpt>
                                        </ArtInfo>
                                    </Content>
                                    <FullArticleButton>
                                        <Link as={`/article/${article.slug}`} href="/article/slug"><BtnName>Full article</BtnName></Link>
                                    </FullArticleButton>
                                </CardContent>
                            </MuiCard>
                        </ArticlesContainer>
                    )
                }) :
                <SingleArticle
                    articles={articles}
                    convertHTMLEntityForTag={convertHTMLEntityForTag}
                    convertHTMLEntityForSymbols={convertHTMLEntityForSymbols} />
            }
        </>
    )
}

const ArticlesContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`
const MuiCard = styled(Card)`
    width: 68%;
    height: 290px;
    display: flex;
    justify-content: center;
    margin-top: 13px;
    background-color: black
`
const Content = styled.div`
    display: flex;

    &:hover .delete_button {
        display: flex;
        justify-content: end;
      }
`
const ArtImg = styled.img`
    width: 420px;
    height: 240px;
    margin-top: 6px;
    cursor: pointer
`
const ArtInfo = styled.div`
    width: 420px; 
    height: 240px;
    margin-left: 40px;    
    display: grid;
    align-items: center;  
`
const DeleteButton = styled.button`
    color: red;
    background-color: transparent;
    width: 100%;
    display: flex;
    justify-content: end;
    font-size: 15px;
    cursor: pointer;
    display: none
`
const ArtTitle = styled.p`
    color: white;
    font-size: 20px;
    cursor: pointer
`
const TitleName = styled.a`
    color: white;
`
const ArtDate = styled.p`
    color: #959696;
    padding-top: 12px;
    font-size: 15px
`
const ArtExcerpt = styled.p`
    color: white;
    font-size: 15px;
    padding-top: 12px;
    text-align: justify;
`
const FullArticleButton = styled.button`
    background-color: transparent;
    font-size: 14px;
    display: flex;
    justify-content: end;
    width: 100%;
    cursor: pointer
`
const BtnName = styled.p`
    color: #51ABF8;
`

export default ArticlesList