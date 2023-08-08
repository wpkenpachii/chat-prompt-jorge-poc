const msgerForm=get(".msger-inputarea"),msgerInput=get(".msger-input"),msgerChat=get(".msger-chat"),BOT_MSGS=["Hi, how are you?","Ohh... I can't understand what you trying to say. Sorry!","I like to play games... But I don't know how to play!","Sorry if my answers are not relevant. :))","I feel sleepy! :("],BOT_IMG="https://image.flaticon.com/icons/svg/327/327779.svg",PERSON_IMG="https://image.flaticon.com/icons/svg/145/145867.svg",BOT_NAME="Sirius_Bot",PERSON_NAME="Sajad";function appendMessage(e,t,s,n){s=`
    <div class="msg ${s}-msg">
      <div class="msg-img" style="background-image: url(${t})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${e}</div>
          <div class="msg-info-time">${formatDate(new Date)}</div>
        </div>

        <div class="msg-text">${n}</div>
      </div>
    </div>
  `;msgerChat.insertAdjacentHTML("beforeend",s),msgerChat.scrollTop+=500}function botResponse(){var e=random(0,BOT_MSGS.length-1);const t=BOT_MSGS[e];e=100*t.split(" ").length;setTimeout(()=>{appendMessage(BOT_NAME,BOT_IMG,"left",t)},e)}function get(e,t=document){return t.querySelector(e)}function formatDate(e){var t="0"+e.getHours(),e="0"+e.getMinutes();return t.slice(-2)+":"+e.slice(-2)}function random(e,t){return Math.floor(Math.random()*(t-e)+e)}async function openAiRequest(e){const t=[];document.getElementById("predefined_prompt").value.split("\n").forEach(e=>{t.push({role:"system",content:e})}),t.push({role:"user",content:e});e=(await(await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer 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"},body:JSON.stringify({model:"gpt-3.5-turbo",messages:t})})).json()).choices[0].message.content,console.log("Assistant:",e);e=await e;appendMessage(BOT_NAME,BOT_IMG,"left",e)}msgerForm.addEventListener("submit",e=>{e.preventDefault();e=msgerInput.value;e&&(openAiRequest(e),appendMessage(PERSON_NAME,PERSON_IMG,"right",e),msgerInput.value="")});