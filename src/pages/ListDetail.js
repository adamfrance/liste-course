import React, { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/NavBar/NavBar";
import ListItem from "../components/ListItem/ListItem"
import { ItemsContext } from "../contexts/ItemsContext";
import { ListsContext } from "../contexts/ListsContext";




// params(no liste), useDataFetching, composant ListItem...


const ListItemWrapper = styled.div `
display: flex;
justify-content: space-between;
flex-direction: column;
margin: 2% 5%;
`;

const ListDetail = () => {
    const { listId } = useParams()
    let navigate = useNavigate()

    const { items, error, loading, fetchItems } = useContext(ItemsContext)
    const { list, fetchList } = useContext(ListsContext)

    useEffect(() => {
        listId && fetchItems(listId)
    }, [listId, fetchItems])

    useEffect(() => {
        listId && fetchList(listId)
    }, [listId, fetchList])

    return (

        <React.Fragment>
         { 
            navigate && <NavBar  
            goBack={() => navigate(-1)}  
            openForm={() => navigate(`/list/${listId}/new`)}
            title = {list && list.title} /> }
        <ListItemWrapper>
          { !loading || error ? (
            <span>{error || 'En cours de chargement...'}</span>
            ) : (
            items.map(item => <ListItem key={item.id} {...item} />)
            )}
        </ListItemWrapper>

        </React.Fragment>
    )

}

export default ListDetail