import s from "./paginator.module.css";
import React, {useEffect, useState} from "react";
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../../utils/FormsControls/FormContorls";
import {requiredField} from "../../../utils/Validators/validators";

import cn from "classnames"

type PropsType ={
    totalItemsCount : number
    pageSize : number
    currentPage : number
    onPageChanged : (pageNumber:number) => void
    portionSize: number
    portionNumber : number
    setPortionNumber : (portionNumber:number) => number
}
let Paginator:React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize, portionNumber, setPortionNumber, ...props}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages:Array<number> = []
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
type PropsType2={
    portionSize: number
    pageCount: number
    onPageChanged : (pageNumber:number) => void
    setPortionNumber: (portionNumber:number)=> number
}
const AddPageNumber:React.FC<PropsType2> = ({portionSize,pageCount, onPageChanged,setPortionNumber}) => {

    const [page, setPage] = useState<any>(false)
    const [error, setError] = useState(false)


    const onSubmit = () => {
        if (parseInt(page) > pageCount || parseInt(page) <= 0 || !page) {
            setError(true)
        } else {
           onPageChanged(parseInt(page))
           setPortionNumber(Math.ceil(parseInt(page) / portionSize))
            setError(false)
            setPage(false)
        }
    }
    return (
        <div className={s.error}>
            <div>
                <input className={s.input} value={page} onChange={(e) => setPage(e.currentTarget.value)} type="number"
                       onKeyPress={event => event.key === "Enter" && onSubmit()}

                placeholder={"ВВЕДИТЕ НОМЕР СТРАНИЦЫ "}/>
            </div>
            <div>
                <button onClick={onSubmit}>CLICK</button>
            </div>
            {error && <div className={s.errorText}>Max number page {pageCount}</div>}
        </div>
    )
}


export default Paginator





