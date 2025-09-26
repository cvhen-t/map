import { WechatyBuilder, ScanStatus, log } from 'wechaty';
import qrcode from 'qrcode-terminal';
import chatGpt from '../public/ccWhet.js';

const chatGptApi = new chatGpt();
// 微信聊天工具
const wechaty = WechatyBuilder.build();
// 提取触发关键词之外的内容，只有触发关键词才回答，不然每个聊天记录都回答就很傻，比如："卡米，中国有多大？" 才会回答
const getMsg = (msgText, key) => {
    if (msgText.includes(key)) {
        return msgText
            .replaceAll(key + ',', '')
            .replaceAll(key + '，', '')
            .replaceAll('@' + key, '')
            .replaceAll(key, '');
    }
    return false;
};

window.ccwt = function main() {
    const onLogout = (user) => {
        console.log(`用户 ${user} 退出成功`);
    };
    const onLogin = (user) => {
        console.log(`用户 ${user} 登录成功`);
    };
    const onError = console.error;
    const onScan = (code, status) => {
        // status: 2代表等待，3代表扫码完成
        status === ScanStatus.Waiting && qrcode.generate(code, { small: true }, console.log);
    };

    const onMessage = async (msg) => {
        const room = msg.room(); // 获取群聊信息
        const contact = msg.talker(); // 获取这条消息发送人的信息
        const contactName = contact.name(); // 发送人的昵称
        const msgText = await msg.text(); // 消息内容
        if (msgText) {
            try {
                const msgContent = getMsg(msgText, '恺哥，') || getMsg(msgText, '小猪，');
                // 包含有关键词才回复，避免所有消息回复刷屏
                if (msgContent) {
                    // 群聊
                    if (room) {
                        const topic = await room.topic(); // 群名称
                        if (topic === '无敌') {
                            // 特殊群体特殊对待
                            return chatGptApi.answerSay(msgContent, room, false);
                        }
                        chatGptApi.answerSay(msgContent, room);
                    } else {
                        if (msg.self()) {
                            return;
                        }
                        chatGptApi.answerSay(msgContent, contact);
                    }
                }
            } catch (error) {
                console.log(error, 1111111);
            }
        }
    };

    // 生成登录的二维码
    wechaty.on('scan', onScan).on('login', onLogin).on('logout', onLogout).on('message', onMessage).on('error', onError);
    wechaty.start();
};
