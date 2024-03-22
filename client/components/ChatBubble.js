import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useStateContext } from '../contexts/ContextProvider';

const ChatBubble = ({ agent, content, attachments }) => {

    const { setBibleIndex } = useStateContext();
    const navigation = useNavigation();
    const { t } = useTranslation();
    const isUser = agent === '<|user|>';

    const handleAttachmentPress = (book, chapter) => {
        setBibleIndex({ book: book, chapter: chapter })
        navigation.navigate(t("BottomNavigator_Bible"));
    };

    return (
        <View style={[styles.chatItem, isUser ? styles.userItem : styles.assistantItem]}>
        <Text style={styles.chatText}>{content}</Text>
        {attachments && (
            <View style={styles.attachmentsContainer}>
            {attachments.map((attachment, index) => (
                <TouchableOpacity
                key={index}
                style={styles.attachmentButton}
                onPress={() => handleAttachmentPress(attachment.book, attachment.chapter)}
                >
                <Text style={styles.attachmentButtonText}>{attachment.content}</Text>
                </TouchableOpacity>
            ))}
            </View>
        )}
        </View>
    );
};

const styles = StyleSheet.create({
        chatItem: {
            padding: 12,
            borderRadius: 8,
            marginBottom: 8,
            maxWidth: '80%',
        },
        userItem: {
            alignSelf: 'flex-end',
            backgroundColor: '#007AFF',
        },
        assistantItem: {
            alignSelf: 'flex-start',
            backgroundColor: '#E5E5EA',
        },
        chatText: {
            fontSize: 16,
            color: 'black',
        },
        attachmentsContainer: {
            marginTop: 8,
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        attachmentButton: {
            backgroundColor: '#007AFF',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
            marginRight: 5,
            marginBottom: 5,
        },
        attachmentButtonText: {
            color: 'white',
            fontSize: 14,
        },
});

export default ChatBubble;