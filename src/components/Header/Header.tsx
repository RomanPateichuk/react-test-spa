import {useAnimationFrame} from "framer-motion";
import React, {useRef} from "react";
import s from "./Header.module.css"
import {AddItem} from "../AddItem/AddItem";
import {EditableSpanTitle} from "../EditableSpanTitle/EditableSpanTitle";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../redux/store";
import {changeHeaderTitleAC} from "../../redux/header-reducer";
import {addLIstAC} from "../../redux/list-reducer";


export const Header: React.FC = React.memo(() => {
    const title = useSelector<AppRootType, string>(state => state.header.title)
    const dispatch = useDispatch()
    const ref = useRef<HTMLDivElement>(null);

    const addList = (title: string) => {
        dispatch(addLIstAC(title))
    }


    const onChangeEditableSpanTitle = (value: string) => {
        dispatch(changeHeaderTitleAC(value))
    }


    useAnimationFrame((t) => {
        const rotate = Math.sin(t / 10000) * 200;
        const y = (1 + Math.sin(t / 1000)) * -50;
        if (ref.current !== null) {
            ref.current.style.transform = `translateY(${y}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`
        }
    });


    return (
        <header className={s.header}>
            <div className={s.bodyHeader}>
                <div className={s.cubeHeader} ref={ref}>
                    <div className={s.frontHeader}/>
                    <div className={s.leftHeader}/>
                    <div className={s.rightHeader}/>
                    <div className={s.topHeader}/>
                    <div className={s.bottomHeader}/>
                    <div className={s.backHeader}/>
                </div>
            </div>
            <h1 className={s.titleHeader}>
                <EditableSpanTitle title={title} onChangeEditableSpan={onChangeEditableSpanTitle}/>
                <span className={s.titleShadow}>Notes</span>
            </h1>
            <div className={s.inputHeader}>
                <AddItem handlerAdd={addList}/>
            </div>
        </header>
    )
})
