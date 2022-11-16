import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button/Button";
import FormItem from "../components/FormItem/FormItem";
import NavBar from "../components/NavBar/NavBar";
import { ItemsContext } from "../contexts/ItemsContext";
import { ListsContext } from "../contexts/ListsContext";





const FormWrapper = styled.div `
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const SubmitButton = styled(Button)
`
  background: blue;
  margin: 2% 0;
`;


const FormUpdate = () => {
    let navigate = useNavigate()
    const { listId, ...data } = useParams()
    const { updateItem } = useContext(ItemsContext)
    const { list } = useContext(ListsContext)

    const [title, setTitle] = useState(data.title)
    const [quantity, setQuantity] = useState(data.quantity)
    const [price, setPrice] = useState(data.price)


    function onSubmit(e) {
        e.preventDefault()
        if (title && quantity && price) {
            const updatedItem = {
                id: data.id,
                title,
                quantity,
                price,
                listId
            }
            updateItem(updatedItem)
        }
        navigate(`/list/${listId}`)
    }

    return (
        <React.Fragment>
    { navigate && <NavBar goBack={() => navigate(-1)} title={`Modifier un Element de la liste ${list.title}`} />}
    <FormWrapper>
      <form onSubmit={onSubmit}>
        <FormItem id='title' label='Title' value={title} handleOnChange={e => setTitle(e.currentTarget.value)}/>
        <FormItem 
          id = 'quantity'
          label='quantity'
          type='number'
          value={quantity}
          handleOnChange = { e => setQuantity(e.currentTarget.value) }
        />
        <FormItem id='price' label='Price' type='number' value={price} handleOnChange={e => setPrice(e.currentTarget.value)}/>
        <SubmitButton disabled={!title || !quantity || !price}>{`Ajouter l'element`}</SubmitButton>
      </form>

    </FormWrapper>


    </React.Fragment>
    )

}

export default FormUpdate