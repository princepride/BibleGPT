import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const InputBox = ({ onSend }) => {
    const { t } = useTranslation();
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim() !== '') {
        onSend(text.trim());
        setText('');
        }
    };

    return (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder={t("InputBox_TextInput_Placeholder")}
            value={text}
            onChangeText={setText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>{t("InputBox_Send")}</Text>
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        padding: 10,
    },
    input: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#007AFF',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    sendButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default InputBox;