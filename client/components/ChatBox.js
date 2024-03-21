import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';

const ChatBox = ({ data }) => {
  const renderItem = ({ item }) => {
    const [role, content] = item;
    const isUser = role === 'user';

    return (
      <View style={[styles.chatItem, isUser ? styles.userItem : styles.assistantItem]}>
        <Text style={styles.chatText}>{content}</Text>
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
});

export default ChatBox;