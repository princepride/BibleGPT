import React, { useRef, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import ChatBubble from './ChatBubble';

const ChatBox = ({ data }) => {
  const flatListRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  const renderItem = ({ item }) => <ChatBubble {...item} />;

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <FlatList
      ref={flatListRef}
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