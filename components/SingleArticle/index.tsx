import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Card, CardContent } from "@mui/material";
import moment from 'moment';

import { IsArticle } from '../../Interfaces/interfaces';

const SingleArticle = ({ articles, convertHTMLEntityForTag, convertHTMLEntityForSymbols }: any) => {
    const router = useRouter();

    const singleArticle = articles?.filter((article: IsArticle) => article.slug === router.query.slug);

    return (
        <ArticlesContainer>
            <MuiCard>
                <CardContent>
                    <Content>
                        <ArtImg src={`https://www.alpha-orbital.com/assets/images/post_img/${singleArticle?.[0]?.post_image}`} />
                        <ArtInfo>
                            <ArtTitle>{singleArticle?.[0]?.title}</ArtTitle>
                            <ArtDate>{moment(singleArticle?.[0]?.date).format("DD.MM.YYYY")}</ArtDate>
                            <ArtExcerpt>{convertHTMLEntityForTag(convertHTMLEntityForSymbols(singleArticle?.[0]?.excerpt))}</ArtExcerpt>
                        </ArtInfo>
                    </Content>
                </CardContent>
            </MuiCard>
        </ArticlesContainer>
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
const ArtTitle = styled.p`
    color: white;
    font-size: 20px;
    cursor: pointer
`
const ArtDate = styled.p`
    color: #959696;
    padding-top: 12px;
  `
const ArtExcerpt = styled.p`
    color: white;
    font-size: 15px;
    padding-top: 12px;
    text-align: justify;
`
export default SingleArticle