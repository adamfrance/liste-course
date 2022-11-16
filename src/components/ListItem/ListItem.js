import styled from "styled-components";

// d'ou vient la data ?
// comment l'envoyer a listitem
// +++ comment appeler la route avec l'id de la liste (Link)
// 

const ListItemWrapper = styled.div `
  display: flex;
  text-align: left;
  align-items: center;
  padding: 1%;
  background: lightGray;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 2%;
  text-decoration: none;
`;

const Title = styled.h3 `
  flex-basis: 70%;
`;

const Total = styled.span `
  flex-basis: 15%;
  font-weight: bold;
  text-align: right;
`;

const ListItem = ({ title, quantity, price }) => {

    return (
        <ListItemWrapper>
        <Title>{title}</Title>
        <Total>{quantity}</Total>
        <Total>{`$ ${price}`}</Total>
    </ListItemWrapper>
    )
}

export default ListItem