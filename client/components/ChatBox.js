import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import ChatBubble from './ChatBubble';

const ChatBox = ({ data }) => {
  const renderItem = ({ item }) => <ChatBubble {...item} />;

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
});

export default ChatBox;