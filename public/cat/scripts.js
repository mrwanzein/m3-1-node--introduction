const messageInput = document.querySelector("#user-input");
const conversationElem = document.querySelector("#conversation-container");

const handleFocus = () => {
    messageInput.focus();
};

const updateConversation = (message) => {
    // deconstruct the message object
    const { author, text } = message;
    // create a <p> element
    const messageElem = document.createElement('p');
    // add the text message to the element
    messageElem.innerHTML = `<span>${text}</span>`;
    messageElem.classList.add('message', author);
    // append the element to the conversation
    conversationElem.appendChild(messageElem);
    conversationElem.scrollTop = conversationElem.scrollHeight;
    
    handleFocus();
};

const sendMessage = (event) => {
    // prevent the default "page reload" from occurring.
    event.preventDefault();
    const message = { author: 'user', text: messageInput.value };
    updateConversation(message);

    if (message.author === 'user') {
        messageInput.value = '';
    }

    fetch('/cat-message')
    .then((res) => res.json())
    .then((data) => {
    updateConversation(data.message);
    });
};

handleFocus();