import React, { useContext } from 'react';
import DataContext from '../../store/data-context';
import ItemCard from './ItemCard';
import classes from './ItemsLayout.module.css'

export default function ItemsLayout() {
    const { data } = useContext(DataContext)
    console.log(data)

    return <div className={classes.itemsLayout}>
        {data.map(item => {
            return <ItemCard key={item.id} className={classes.item} item={item}></ItemCard>
        })}
    </div>}
