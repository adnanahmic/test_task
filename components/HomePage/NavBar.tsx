import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { NAV_BAR, CATEGORIES } from "../../constants";
import { IsNavBar } from "../../Interfaces/interfaces";

export const NavBar = ({ pull_data_from_ARTICLES }: any) => {
    const router = useRouter();

    const [filteredNavBar, setFilteredNavBar] = useState<any>();
    const [filteredCategories, setFilteredCategories] = useState<any>();
    const [isRemoved, setIsRemoved] = useState(false);
    const [removeBtnIsClicked, setRemoveBtnIsClicked] = useState(false);
    const [deletedNavBarItems, setDeletedNavBarItems] = useState<any>([]);

    const navBarItems = !isRemoved ? NAV_BAR : filteredNavBar;
    const categoriesItems = !isRemoved ? CATEGORIES : filteredCategories;

    const removeArticles = (category: string) => {
        const filteredNavBarItems = filteredNavBar.filter((el: IsNavBar) => el.name !== category);
        const filteredDeletedNavBarItems = filteredNavBar.filter((el: IsNavBar) => el.name === category);
        const filteredCategoriesItems = filteredCategories.filter((el: any) => el !== category);
        setFilteredNavBar(filteredNavBarItems);
        setFilteredCategories(filteredCategoriesItems);
        setDeletedNavBarItems([...deletedNavBarItems, ...filteredDeletedNavBarItems]);
        setIsRemoved(true);
        setRemoveBtnIsClicked(true)
    };

    pull_data_from_ARTICLES({ removeBtnIsClicked, deletedNavBarItems })

    useEffect(() => {
        setFilteredNavBar(NAV_BAR);
        setFilteredCategories(CATEGORIES);
    }, []);

    return (
        <NavBarContainer>
            {navBarItems.map((route: any) => {
                return (
                    <Link as={route.as} href={route.href} key={route.name}>
                        <LinkItem
                            style={{ color: router.route === `${route.href}` ? "#51ABF8" : "white", textDecoration: router.route === `${route.href}` ? "underline" : "none" }}>
                            {route.name}
                        </LinkItem>
                    </Link>
                )
            })}
            <MuiAccordion>
                <AccordionSummary expandIcon={<MuiExpandMoreIcon />} />
                <MuiAccordionDetails>
                    {categoriesItems.map((category: any) => {
                        return (
                            <List key={category}>
                                <Typography key={category}>{category}</Typography>
                                <RemoveButton onClick={() => removeArticles(category)}>Remove</RemoveButton>
                            </List>
                        )
                    })}
                </MuiAccordionDetails>
            </MuiAccordion>
        </NavBarContainer>
    )
}

const NavBarContainer = styled.div`
    display: flex;
    justify-content: center;
`
const LinkItem = styled.a`
    font-size: 21px;
    cursor: pointer;
    padding: 25px;
`
const MuiAccordion = styled(Accordion)`
    width: 50px;
    height: 44px;
    background: transparent;
    padding-top: 11px;
`
const MuiExpandMoreIcon = styled(ExpandMoreIcon)`
    width: 45px;
    height: 56px;
    fill: white;
    padding-top: 7px;
`
const MuiAccordionDetails = styled(AccordionDetails)`
    background-color: #E8EAED;
    width: 250px;
    margin:auto;
    margin-top: 3px
`
const List = styled.div`
    display: flex;
    justify-content: space-between
`
const RemoveButton = styled.button`
    background-color: transparent;
    border: none;
    color: red;
    cursor: pointer;

    &:hover {
        color: green
    }
`

export default NavBar