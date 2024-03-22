import { View, StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import ChatBox from '../components/ChatBox';
import InputBox from '../components/InputBox';
import { useStateContext } from '../contexts/ContextProvider';
import {chat} from '../utils/connect'

const GPTPage = () => {
    const { chatData, setChatData } = useStateContext();

    const handleSend = async (text) => {
        setChatData(prevChatData => [...prevChatData, { agent: '<|user|>', content: text }, { agent: 'loading' }]);
        await chat({ chatData: [...chatData, { agent: '<|user|>', content: text }] })
        .then(data => {
            setChatData(prevChatData => {
            const updatedChatData = [...prevChatData];
            updatedChatData.pop(); // 删除最后一个元素(加载状态)
            return [...updatedChatData, data]; // 将返回的数据添加到更新后的chatData中
            });
        });
    };

    return (
        <View style={styles.container}>
        <ChatBox data={chatData} />
        <InputBox onSend={handleSend} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
    },
});

export default GPTPage;