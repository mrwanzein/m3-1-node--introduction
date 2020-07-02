const messageInput = document.querySelector('#user-input');
const conversationElem = document.querySelector('#conversation-container');

let jokeFlag = false;

// focus the input on load
const handleFocus = () => {
  messageInput.focus();
};

// updateConversation expects an object with 'user' and 'text'
const updateConversation = (message) => {
  const { author, text } = message;
  const messageElem = document.createElement('p');

  messageElem.classList.add('message', author);
  messageElem.innerHTML = `<span>${text}</span>`;
  conversationElem.appendChild(messageElem);
  conversationElem.scrollTop = conversationElem.scrollHeight;

  if (author === 'user') messageInput.value = '';
  handleFocus();
};

const getBotMessage = (obj) => {
  const commonGreetings = ['hi', 'hello', 'howdy'];
  const commonGoodbye = ['bye', 'goodbye', 'bye bye', 'farewell'];
  const jokes = [
    `What happens to a frog's car when it breaks down?
  It gets toad away.`, 
  `My friend thinks he is smart. He told me an onion is the only food that makes you cry, so I threw a coconut 
  at his face.`, 
  `Q: What did the duck say when he bought lipstick?
  A: "Put it on my bill."`, 
  `Q: Why was six scared of seven?
  A: Because seven "ate" nine.`
];
  
let botMsg = '';
let randomJoke = Math.floor(Math.random() * jokes.length);
  

  if(obj.text.toLowerCase().includes('yes')) jokeFlag = true;

  if (commonGreetings.includes(obj.text.toLowerCase())) {
    botMsg = 'Hello!';
    obj.text = botMsg;
  } 
  else if (commonGoodbye.includes(obj.text.toLowerCase())) {
    botMsg = 'See you soon!';
    obj.text = botMsg;
  } 
  else if (obj.text.toLowerCase().includes('something funny')) {
    botMsg = 'Do you want to hear something funny? Yes or no?';
    obj.text = botMsg;
  } 
  else if(obj.text.toLowerCase().includes('yes') && jokeFlag) {
      botMsg = jokes[randomJoke];
      jokeFlag = false;
      obj.text = botMsg;
  } 
  else if(obj.text.toLowerCase().includes('no') && !jokeFlag) {
    botMsg = "That's okay";
    obj.text = botMsg;

  } 
  else {
    obj.text = `Bzzt ${obj.text}`;
  }

  return obj;
};

const sendMessage = (event) => {
  event.preventDefault();

  const message = { author: 'user', text: messageInput.value };
  updateConversation(message);

  fetch(`/bot-message/?repeatedText=${message.text}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      updateConversation(getBotMessage(data.message));
    });
};

// call handleFocus on load
handleFocus();
