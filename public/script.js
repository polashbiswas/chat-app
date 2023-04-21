const socket = io();
let username = "";



document.getElementById("join-btn").addEventListener("click", (event) => {
    event.preventDefault();
    username = document.getElementById("username-input").value;
    if (username.trim() != "") {
        document.querySelector(".form-username").style.display = "none";
        document.querySelector(".chatroom-container").style.display = "block";
        document.querySelector(".chatroom-header").innerText = `Chatroom - ${username}`;

        socket.emit("username enter", username);
    } else {
        alert("Username cannot be empty");
    }

});

document.getElementById("send-btn").addEventListener("click", (event) => {
    event.preventDefault();
    //inform socket.io
    const data = {
        username: username,
        message: document.getElementById("message-input").value
    };
    //emit the message to the watchman -> give message to watchman
    socket.emit("chat message", data);
    //communicate with the watchman that a msg is sent
    addMessage(data, true);
});


//recive user entered
socket.on("username enter", (data) => {
    if (data !== username) {
        var msgDiv = document.createElement("div");
        msgDiv.innerText = `${data} has entered!`;
        document.querySelector("#messages-container").appendChild(msgDiv);
    }
});

//recive message
socket.on("chat message", (data) => {
    if (data.username !== username) {
        addMessage(data, false);
    }
});

function addMessage(data, flag) {
    var msgDiv = document.createElement("div");
    msgDiv.innerText = `${data.username}: ${data.message}`;
    if (flag) {
        msgDiv.setAttribute("class", "message sent");
    } else {
        msgDiv.setAttribute("class", "message recived");
    }

    document.querySelector("#messages-container").appendChild(msgDiv);
}

//function if some sender sends the message, receive that message and append that child

document.getElementById("exit-btn").addEventListener("click", () => {
    socket.emit("user left", username);
});


//user exit message from chat
socket.on("user left", (data) => {
    if (data !== username) {
        var msgDiv = document.createElement("div");
        msgDiv.innerText = `${data} has left!`;
        document.querySelector("#messages-container").appendChild(msgDiv);
    }
});