import { View, StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import ChatBox from '../components/ChatBox';
import InputBox from '../components/InputBox';
import { useStateContext } from '../contexts/ContextProvider';
import {chat} from '../utils/connect'

const GPTPage = () => {
    const { chatData, setChatData } = useStateContext();

    const handleSend = async (text) => {
        setChatData(prevChatData => [...prevChatData, { agent: '<|user|>', content: text }]);
        await chat({ chatData: [...chatData, { agent: '<|user|>', content: text }] })
        .then(data => {
            setChatData(prevChatData => [...prevChatData, data]);
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