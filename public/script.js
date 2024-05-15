(function () {
  const app = document.querySelector(".app");
  const socket = io();

  let uname;

  app
    .querySelector(".join-screen #join-user")
    .addEventListener("click", function () {
      let username = app.querySelector(".join-screen #username").value;
      if (username.length == 0) {
        return;
      }
      uname = username;
      socket.emit("newuser", username);
      app.querySelector(".join-screen").classList.remove("active");
      app.querySelector(".chat-screen").classList.add("active");
    });
  app
    .querySelector(".chat-screen #exit-chat")
    .addEventListener("click", function () {
      app.querySelector(".join-screen").classList.add("active");
      app.querySelector(".chat-screen").classList.remove("active");
    });
  app
    .querySelector(".chat-screen #send-message")
    .addEventListener("click", function () {
      let message = app.querySelector(".chat-screen #message-input").value;
      if (message.length == 0) {
        return;
      }
      renderMessage({ username: uname, text: message });
    });
  function renderMessage(message) {
    let messageContainer = app.querySelector(".chat-screen .messages");
    let el = document.createElement("div");
    el.setAttribute("class", "message my-message");
    el.innerHTML = `
    <div>
      <div class="name">You:${message.username}</div>
      <div class="text">${message.text}</div>
    </div>`;
    messageContainer.appendChild(el);
  }
})();
