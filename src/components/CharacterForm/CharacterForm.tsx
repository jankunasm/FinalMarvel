import React from 'react';
import {  useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseName, chooseDescription } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { Button } from '@mui/material';

//Access API
import {  server_calls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface CharacterFormProps {
    id?: string;
    data?: {}
}

interface CharacterState {
    name: string;
    description: string;
}

export const CharacterForm = (props:CharacterFormProps) => {
    const dispatch = useDispatch()
    let { characterData, getData } = useGetData();
    const store = useStore()
    const name = useSelector<CharacterState>(state => state.name)
    const description = useSelector<CharacterState>(state => state.description)
    const { register, handleSubmit } = useForm({ })

    const onSubmit = async (data: any, event: any) => {
        console.log(props.id)

        if( props.id!){
            await server_calls.update(props.id!, data)
            console.log(`Updated: ${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseName(data.name))
            dispatch(chooseDescription(data.description))
            await server_calls.create(store.getState())
            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Character Name</label>
                    <Input {...register('name')} name="name" placeholder='Name' />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('description')} name="description" placeholder="Description"/>
                </div>
                <div>
                    <label htmlFor="comics_appeared_in">Comic Appearances</label>
                    <Input {...register('comics_appeaered_in')} name="comics_appeared_in" placeholder="Comic Appearances"/>
                </div>
                <div>
                    <label htmlFor="super_power">Super Power</label>
                    <Input {...register('super_power')} name="super_power" placeholder="Super Power"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}