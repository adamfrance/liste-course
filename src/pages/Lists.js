import { useNavigate, Link } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import { ListsContext } from "../contexts/ListsContext";




const ListWrapper = styled.div `
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 5%;
`;

const ListLink = styled(Link)
`
  display: flex;
  text-align: left;
  align-items: center;
  padding: 1%;
  background: lightGray;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 2%;
  color: black;
  text-decoration: none;
`;

const Title = styled.h3 `
  flex-basis: 80%;
`;

const Lists = () => {
    let navigate = useNavigate();

    console.log(useContext(ListsContext))

    const { lists, error, loading, fetchLists } = useContext(ListsContext)

    useEffect(() => {
        !lists.length && fetchLists()
    }, [fetchLists, lists])

    return ( <
        >
        { navigate && <NavBar title="Votre liste" /> }
        <ListWrapper>
        {!loading || error ? (
          <span>{error || "En cours de chargement..."}</span>
        ) : (
          lists.map((list) => (
            <ListLink key={list.id} to={`list/${list.id}`}>
              <Title>{list.title}</Title>
            </ListLink>
          ))
        )}
      </ListWrapper> <
        />
    );
};

export default Lists;