import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useStateContext } from '../contexts/ContextProvider';
import React from 'react';

const ChatBox = ({ data }) => {
  const { setBibleIndex } = useStateContext();
  const renderItem = ({ item }) => {
    console.log(item);
    const { agent, content, attachments } = item;
    const isUser = agent === '<|user|>';

    return (
      <View style={[styles.chatItem, isUser ? styles.userItem : styles.assistantItem]}>
        <Text style={styles.chatText}>{content}</Text>
        {attachments && (
          <View style={styles.attachmentsContainer}>
            {attachments.map((attachment, index) => (
              <TouchableOpacity
                key={index}
                style={styles.attachmentButton}
                onPress={() => setBibleIndex({ book: attachment.book, chapter: attachment.chapter })}
              >
                <Text style={styles.attachmentButtonText}>{attachment.content}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.chatContainer}
    />
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
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

export default ChatBox;