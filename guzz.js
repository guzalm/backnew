function showSuccessMessage() {
  alert("You have successfully subscribed to our newsletter!");
}
function sendMessage() {
  var messageInput = document.getElementById("message-input");
  var messageText = messageInput.value.trim();

  if (messageText !== "") {
    var chatMessages = document.getElementById("chat-messages");
    var newMessage = document.createElement("div");
    newMessage.className = "message";
    newMessage.textContent = "You: " + messageText;
    chatMessages.appendChild(newMessage);

    messageInput.value = "";
  }
}
// Get the button
var mybutton = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
