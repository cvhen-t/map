<template>
    <div class="chat-page">
        <div class="user-list">
            <h3>在线用户列表</h3>
            <ul>
                <li v-for="user in userList"
                    :key="user.id">{{ user.name }}</li>
            </ul>
        </div>
        <div class="chat-area">
            <div ref="messageList"
                 class="message-list">
                <div style="display: block;"
                     :class=" message.isown?'active':''"
                     v-for="message in messageList"
                     :key="message.id"
                     class="message">

                    <div v-if="message.type!=='img'">
                        <span :class=" message.isown?'message-content':'message-sender'">{{ message.isown?message.msg:message.username }}</span>：
                        <div style="display: inline-block;"
                             :class=" message.isown?' message-sender':'message-content'">{{ message.isown?message.username:message.msg }}</div>
                    </div>

                    <div v-if="message.type==='img'&& message.isown">
                        <img style="width: 100px; height: 100px; "
                             :src=" message.url"
                             alt="Image">：
                        <div style="display: inline-block;"
                             class="message-sender">{{message.username }}</div>
                    </div>

                    <div v-if="message.type==='img'&& !message.isown">
                        <div style="display: inline-block;"
                             class="message-sender">{{message.username }}</div>:
                        <img style="width: 100px; height:100px;;"
                             :src=" message.url"
                             alt="Image">
                    </div>

                </div>
            </div>
            <div class="message-input">
                <input ref="inputRef"
                       type="text"
                       v-model="newMessage"
                       @keyup.enter="sendMessage"
                       placeholder="输入消息...">
                <button @click="sendMessage">发送</button>
                <!-- <button @click="toLongin">连接</button> -->
            </div>
        </div>
        <div class="user-list">
            <h3>表情包</h3>
            <ul class="imgListBox">
                <div class="imgList"
                     v-for="image in images"
                     :key="image.id">
                    <img @click="sendImg(image.urlStr)"
                         style="width: 100%; height: 100%;"
                         :src="image.url"
                         alt="Image" />
                </div>
            </ul>
        </div>
    </div>
</template>
  
  <script>
let webSocket = null;
import webSocketClass from '../../../commin/webSocketClass';
export default {
    data() {
        return {
            userList: [
                {
                    name: 'yyyyy',
                    id: '1'
                },
                {
                    name: 'xxxx',
                    id: '2'
                }
            ], // 在线用户列表
            messageList: [], // 消息列表
            newMessage: '', // 新消息输入框内容
            myName: '大新',
            images: [
                { id: 1, url: require(`@/assets/jpg.png`), urlStr: 'jpg' },
                { id: 2, url: require(`@/assets/photo.png`), urlStr: 'photo' }
                // 添加更多图片对象...
            ]
        };
    },
    mounted() {},
    created() {
        webSocket = new webSocketClass('ws://121.4.20.238:2103', this.handleMessage);
        webSocket.connect();
    },
    methods: {
        sendMessage() {
            if (this.newMessage) {
                const data = {
                    code: 9,
                    username: this.myName,
                    msg: this.newMessage,
                    time: Date.now(),
                    isown: false,
                    type: 'text'
                };
                webSocket.send(data);
                this.newMessage = '';
                this.$refs.inputRef.focus();
            }
        },
        toLongin() {
            webSocket.connect();
        },
        handleMessage(message) {
            this.messageList.push({
                id: Date.now(),
                username: message.username,
                msg: message.msg,
                isown: message.username === this.myName,
                url: message.url ? require(`@/assets/${message.url}.png`) : '',
                type: message.type
            });
            this.scrollToBottom();
        },

        scrollToBottom() {
            this.$nextTick(() => {
                const container = this.$refs.messageList;
                container.scrollTop = container.scrollHeight;
            });
        },
        sendImg(url) {
            console.log(url);
            if (url) {
                const data = {
                    code: 9,
                    username: this.myName,
                    msg: url,
                    time: Date.now(),
                    isown: false,
                    url: url,
                    type: 'img'
                };
                webSocket.send(data);
                this.$refs.inputRef.focus();
            }
        }
    }
};
</script>
  
  <style>
.chat-page {
    display: flex;
}

.user-list {
    flex: 1;
}

.user-list h3 {
    margin-bottom: 10px;
}

.chat-area {
    flex: 3;
    text-align: center;
}

.message-list {
    max-height: 600px;
    overflow-y: auto;
    margin-right: 10%;
    min-height: 600px;
    padding: 10px;
}
.active {
    text-align: right;
}

.message {
    margin-bottom: 10px;
}

.message-sender {
    font-weight: bold;
}

.message-input {
    margin-top: 10px;
}

.message-input input {
    width: 70%;
    margin-right: 10px;
}

.message-input button {
    padding: 5px 10px;
}
.imgListBox {
    display: flex;
}

.imgList {
    width: 100px;
    height: 100px;
    margin: 10px;
    cursor: pointer;
}
</style>
  