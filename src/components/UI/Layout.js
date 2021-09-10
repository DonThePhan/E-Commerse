import React from 'react'
import classes from './Layout.module.css'

export default function Layout(props) {
    return (
        <div className={classes.layout}>
            {props.children}
        </div>
    )
}
