import React from "react";
import "./MessageCard.css";

function MessageCard({name, message, onUpdate, onDelete}) {
    return (
        <div className="messageCard">
          <h1>{name}</h1>
          <h2>{message}</h2>
          <button onClick={() => onUpdate}>Update</button>
          <button onClick={() => onDelete}>Delete</button>
        </div>
    );
}