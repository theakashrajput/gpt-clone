(function () {
    const socket = io();
    const userInput = document.querySelector("#user-input");
    const submitBtn = document.querySelector("#input-submit-btn");
    const chatWindow = document.querySelector("#chat-window");

    function toggleSidebar() {
        let isSidebarActive = false;
        const sidebar = document.querySelector("#sidebar");
        const sideBarBtn = document.querySelector('#sidebar-btn');
        const closeSideBarBtn = document.querySelector('#close-sidebar-btn');
        sideBarBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.style.left = 0;
            isSidebarActive = true;
        });

        document.querySelector("#main").addEventListener("click", () => {
            if (isSidebarActive) {
                sidebar.style.left = "-100%";
                isSidebarActive = false;
            }
        })

        closeSideBarBtn.addEventListener("click", () => {
            sidebar.style.left = "-100%";
            isSidebarActive = false;
        })
    }

    function getCurrentTime() {
        const cTime = new Date();
        return cTime.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" })
    }

    function createMessage({ role = 'bot', text = '' } = {}) {

        const group = document.createElement('div');
        group.className = `chat-msg-group ${role}-msg`;

        const msgDataCont = document.createElement('div');
        msgDataCont.className = "msg-data";

        const msgCont = document.createElement('div');
        msgCont.className = "msg-text";
        msgCont.innerHTML = marked.parse(text);

        const metaData = document.createElement('div');
        metaData.className = "chat-meta-data";
        metaData.innerHTML = `<span class="status-dot"></span>
                    <span>${role === 'user' ? "You" : "Assistant"}</span>
                    <span class="comma-sep"> . </span>
                    <span>${getCurrentTime()}</span>`

        msgDataCont.appendChild(msgCont);
        msgDataCont.appendChild(metaData);

        const avatar = document.createElement("div");
        avatar.className = "avatar";
        avatar.textContent = `${role === "user" ? "U" : "AI"}`;

        group.appendChild(msgDataCont);

        if (role === "user") {
            group.appendChild(avatar);
        } else {
            group.prepend(avatar);
        }

        return group;
    }

    function scrollToBottom() {
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function savedUserMessage() {
        const input = userInput.value.trim();
        if (!input) return console.log("Please enter a value");
        socket.emit("user-prompt", input);
        userInput.value = '';
        userInput.disabled = true;
        submitBtn.disabled = true;
        document.querySelector(".new-chat-msg").style.display = "none";
        const node = createMessage({ role: "user", text: input });
        chatWindow.appendChild(node);
        scrollToBottom();
        dummyResponse();
    }

    function dummyResponse() {
        const dummy = createMessage({ role: 'bot', text: "..." });
        chatWindow.appendChild(dummy);
        scrollToBottom();
    }

    socket.on("ai-response", (res) => {
        getAnswer(res);
    });

    function getAnswer(msg) {
        chatWindow.removeChild(chatWindow.lastElementChild);
        const reply = createMessage({ role: 'bot', text: msg });
        chatWindow.appendChild(reply);
        scrollToBottom();
        userInput.disabled = false;
        submitBtn.disabled = false;
        userInput.focus();
    }

    submitBtn.addEventListener("click", savedUserMessage);
    userInput.addEventListener("keydown", (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            savedUserMessage();
        }
    });

    toggleSidebar();
})();