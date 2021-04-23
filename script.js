const socket = io("http://localhost:3000");

const messegesArea = document.getElementById("messeges");
const msgForm = document.getElementById("msg-form");
const msgValue = document.getElementById("msg");

const sound = new Audio("./beep.mp3");

socket.on("connect", ()=>{

    const userName = prompt("Enter your name to join");
    while (!userName) {
        userName = prompt("Enter your name to join");
    }
    socket.emit("new-user-connection", userName);
    socket.on("user-joined", name => {
        messegesArea.innerHTML += `
        <div class="joined">
            <p><b><u>${name}</u></b> joined the chat</p>
        </div>
        `;
    });

    msgForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        if (!msgValue.value) {
            alert("Empty message cannot be sent");
            return;
        } else{
            const date = new Date();
            socket.emit("send", msgValue.value)
            messegesArea.innerHTML += `
            <div class="message right">
                <p><b>ME :</b> <small>${date.toTimeString().slice(0,5)}</small> <br> ${msgValue.value}</p>
            </div>
            `;
            msgForm.reset();
        }
    });

    socket.on("received", data =>{
        const date = new Date();
        messegesArea.innerHTML += `
        <div class="message left">
            <p><b>${data.name} :</b> <small>${date.toTimeString().slice(0,5)}</small><br>${data.message}</p>
        </div>
        `;
        sound.play();
    });

});