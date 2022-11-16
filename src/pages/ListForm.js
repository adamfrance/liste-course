import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button/Button";
import FormItem from "../components/FormItem/FormItem";
import NavBar from "../components/NavBar/NavBar";
import { ItemsContext } from "../contexts/ItemsContext";




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


const ListForm = () => {
    let navigate = useNavigate()
    const { listId } = useParams()
    const { addItem } = useContext(ItemsContext)

    const [title, setTitle] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')


    function onSubmit(e) {
        e.preventDefault()
        if (title && quantity && price) {
            const newItem = {
                title,
                quantity,
                price,
                listId
            }
            addItem(newItem)
        }
        navigate(`/list/${listId}`)
    }

    return (
        <React.Fragment>
    { navigate && <NavBar goBack={() => navigate(-1)} title={`Ajouter un Element`} />}
    <FormWrapper>
      <form onSubmit={onSubmit}>
        <FormItem id='title' label='Title' placeholder='Nouvel element' value={title} handleOnChange={e => setTitle(e.currentTarget.value)}/>
        <FormItem 
          id = 'quantity'
          label='quantity'
          type='number'
          placeholder='0'
          value={quantity}handleOnChange = { e => setQuantity(e.currentTarget.value) }
        />
        <FormItem id='price' label='Price' type='number' placeholder='0.00' value={price} handleOnChange={e => setPrice(e.currentTarget.value)}/>
        <SubmitButton disabled={!title || !quantity || !price}>{`Ajouter l'element`}</SubmitButton>
      </form>

    </FormWrapper>


    </React.Fragment>
    )

}

export default ListForm