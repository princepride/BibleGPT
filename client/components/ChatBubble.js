import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useStateContext } from '../contexts/ContextProvider';

const ChatBubble = ({ agent, content, attachments }) => {
    const { setBibleIndex, setHighlightedText } = useStateContext();
    const navigation = useNavigation();
    const { t } = useTranslation();
    const isUser = agent === 'user';

    const handleAttachmentPress = (book, chapter, attachmentContent) => {
        setBibleIndex({ book: book, chapter: chapter });
        setHighlightedText(attachmentContent);
        setTimeout(() => {
            setHighlightedText(null);
        }, 2000);
        navigation.navigate(t("BottomNavigator_Bible"));
    };

    return (
        agent === 'loading' ? (
        <View style={[styles.assistantItem, styles.loadingItem]}>
            <ActivityIndicator size="large" color="#007AFF" />
        </View>
        ) : (
        <View style={[styles.chatItem, isUser ? styles.userItem : styles.assistantItem]}>
            <Text style={styles.chatText}>{content}</Text>
            {attachments && (
            <View style={styles.attachmentsContainer}>
                {attachments.map((attachment, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.attachmentButton}
                    onPress={() => handleAttachmentPress(attachment.book, attachment.chapter, attachment.content)}
                >
                    <Text style={styles.attachmentButtonText}>{attachment.book+"第"+String(attachment.chapter+1)+"章："+attachment.content.slice(0,5)+"..."}</Text>
                </TouchableOpacity>
                ))}
            </View>
            )}
        </View>
        )
    );
};

const styles = StyleSheet.create({
        loadingItem: {
            width: '80%',
            padding: 12,
            borderRadius: 8,
            marginBottom: 8,
        },
        chatItem: {
            padding: 12,
            borderRadius: 8,
            marginBottom: 8,
            maxWidth: '80%',
        },
        userItem: {
            alignSelf: 'flex-end',
            backgroundColor: '#E5E5EA',
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
            backgroundColor: '#333333',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 15,
            marginRight: 5,
            marginBottom: 5,
        },
        attachmentButtonText: {
            color: 'white',
            fontSize: 14,
        },
});

export default ChatBubble;