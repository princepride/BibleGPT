import { View, StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import ChatBox from '../components/ChatBox';
import InputBox from '../components/InputBox';
import { useStateContext } from '../contexts/ContextProvider';

const GPTPage = () => {
    const { chatData, setChatData } = useStateContext();

    const handleSend = (text) => {
        setChatData([...chatData, ['<|user|>', text]]);
        // 在这里可以添加将用户输入发送给聊天机器人的逻辑
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