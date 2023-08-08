const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const BOT_MSGS = [
  "Hi, how are you?",
  "Ohh... I can't understand what you trying to say. Sorry!",
  "I like to play games... But I don't know how to play!",
  "Sorry if my answers are not relevant. :))",
  "I feel sleepy! :("
];

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
const BOT_NAME = "Sirius_Bot";
const PERSON_NAME = "Sajad";

msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  
  const msgText = msgerInput.value;
  if (!msgText) return;
  openAiRequest(msgText)

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";

  //botResponse();
});

function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function botResponse() {
  const r = random(0, BOT_MSGS.length - 1);
  const msgText = BOT_MSGS[r];
  const delay = msgText.split(" ").length * 100;

  setTimeout(() => {
    appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
  }, delay);
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


/*
    OPEN AI REQUEST
*/

async function openAiRequest(message) {
     
    // Make sure to replace 'YOUR_API_KEY' with your actual API key from OpenAI
    const apiKey = document.getElementById('api_key').value;
    const endpoint = 'https://api.openai.com/v1/chat/completions';    
    const conversation = [
        // {"role": "system", "content": "You are a knowledgeable assistant that provides information within predefined subject limits."},
        // {"role": "system", "content": "Your responses should focus on topics related to science and technology."},
        // {"role": "user", "content": "Can you explain the concept of artificial intelligence?"},
        // {"role": "assistant", "content": "Certainly! Artificial intelligence refers to..."}
    ];

    document.getElementById('predefined_prompt').value.split('\n').forEach( line => {
        conversation.push({"role": "system", "content": line})
    });

    conversation.push({
        "role": "user",
        "content": message
    })
    
    const generateResponse = async () => {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo', // Use the appropriate model name
                messages: conversation
            })
        });
    
        const responseData = await response.json();
        const assistantReply = responseData.choices[0].message.content;
    
        // Process and display the assistant's reply
        console.log('Assistant:', assistantReply);

        return assistantReply;
    }

    const responseMsg = await generateResponse();
    appendMessage(BOT_NAME, BOT_IMG, "left", responseMsg);
}
