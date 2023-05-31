import { Delete } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import React, { forwardRef } from 'react'
import db from './Firebase';
import "./Messege.css";

const Messege = forwardRef(({id,username,messege},ref) => {
    const isUser = username === messege.username;
    return (
            <React.Fragment>
              <div ref={ref} className={`messege ${isUser && 'messege__user'}`}>

                <div className={isUser ? "card messege__usercard" : "card messege__guestcard"}>
                <div className="card-body p-1">
                <div class="card-title text-left p-0">
                    <small className="alert-dark rounded px-1 text-danger">{isUser ? "You" : messege.username}</small>
                </div>
                {messege.text}
                {isUser ? <IconButton className="text-danger text-right" style={{outline:"none"}} onClick={e => {db.collection("messeges").doc(id).delete()}}><Delete/></IconButton>:""}
                </div>
                </div>
               </div>
            </React.Fragment>
    )
}
)

export default Messege
