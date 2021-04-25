import s from "./paginator.module.css";
import React, {useEffect, useState} from "react";
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../../utils/FormsControls/FormContorls";
import {requiredField} from "../../../utils/Validators/validators";

import cn from "classnames"
const Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize, portionNumber, setPortionNumber, ...props}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionNumber = portionNumber * portionSize
    return <div>
        <div className={s.numberPage}>
            <button className={s.leftBtn} disabled={portionNumber <= 1} onClick={() => {
               setPortionNumber(portionNumber - 1)
            }}> </button>


            {pages
                .filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
                .map(p => {
                    return <span className={cn({[s.selectedPage]:currentPage === p }, s.pageNumber)}
                                 onClick={(e) => {
                                     onPageChanged(p)

                                 }}> {p}</span>
                })}


            <button className={s.rightBtn} disabled={portionCount <= portionNumber} onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}> </button>
        </div>
        <AddPageNumber portionSize={portionSize} pageCount={pagesCount} onPageChanged={onPageChanged}
                      setPortionNumber={setPortionNumber}/>


    </div>
}

const AddPageNumber = ({portionSize, ...props}) => {

    const [page, setPage] = useState(false)
    const [error, setError] = useState(false)


    const onSubmit = () => {
        if (parseInt(page) > props.pageCount || parseInt(page) <= 0 || !page) {
            setError(true)
        } else {
            props.onPageChanged(parseInt(page))
            props.setPortionNumber(Math.ceil(parseInt(page) / portionSize))
            setError(false)
            setPage(false)
        }
    }
    return (
        <div className={error && s.error}>
            <div>
                <input className={s.input} value={page} onChange={(e) => setPage(e.currentTarget.value)} type="number"
                       onKeyPress={event => event.key === "Enter" && onSubmit()}

                placeholder={"ВВЕДИТЕ НОМЕР СТРАНИЦЫ "}/>
            </div>
            <div>
                <button onClick={onSubmit}>CLICK</button>
            </div>
            {error && <div className={s.errorText}>Max number page {props.pageCount}</div>}
        </div>
    )
}


export default Paginator