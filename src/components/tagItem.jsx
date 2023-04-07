import React from "react";
import c from './tagItem.module.scss'
export const TagItem=(props)=>{
    return <p className={c.tag}>#{props.item}</p>
}