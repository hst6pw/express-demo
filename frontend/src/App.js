import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {useEffect, useState} from "react";

function App() {
  // const [info, setInfo] = useState();

  // useEffect(() => {
  //   fetch("http://localhost:9000/users")
  //   .then((res) => res.json())
  //   .then((text) => setInfo(text.result))
  //   .catch((err) => console.log(err))
  // }, []);

  // console.log(info);

  const get = () => {
    const ul = document.getElementById("messages"); 
    ul.innerHTML = "";
    axios.get("http://localhost:9000/messages/all")
    .then((res) => res.data.result.forEach((doc) => {
      const li = document.createElement("li");
      li.innerHTML = doc.data.name + ": ";

      const messageInput = document.createElement("input");
      messageInput.value = doc.data.message;
      messageInput.onchange = () => put(doc.id, messageInput.value);
      li.appendChild(messageInput);

      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "X"
      deleteButton.style = "background-color: #ff0000; color: #fff;";
      deleteButton.onclick = () => remove(doc.id, ul, li);
      li.appendChild(deleteButton);

      ul.appendChild(li);
    }))
    .catch((err) => console.log(err));
  }

  const remove = (messageId, ul, li) => {
    axios.delete("http://localhost:9000/messages/delete", { data: {
      messageId: messageId
    }})
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
    ul.removeChild(li);
  }

  const put = (messageId, newMessage) => {
    axios.put("http://localhost:9000/messages/put", {
      messageId: messageId,
      newMessage: newMessage
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))
  }

  const post = (event) => {
    const nameInput = document.getElementById("name");
    const messageInput = document.getElementById("message");
    axios.post("http://localhost:9000/messages/post", {
      name: nameInput.value,
      message: messageInput.value
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
    nameInput.value = "";
    messageInput.value = "";
    event.preventDefault();
    get();
  }

  return (
    <div className="App">
      <div className='form'>
        <form onSubmit={post}>
          <label>Name: <input id="name" type='text' required></input></label>
          <label>Message: <input id="message" type='text' required></input></label>
          <button type="submit">Send</button>
        </form>
      </div>
      <button onClick={get}>View Messages</button>
      <ul id="messages">

      </ul>
    </div>
  );
}

export default App;
