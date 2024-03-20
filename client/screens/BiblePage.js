import React, { useState } from 'react';
import { View, Text, Modal, Button, Picker, StyleSheet } from 'react-native';
import { useStateContext } from '../contexts/ContextProvider';

const jsonData = {
  "创世记": ["第一章创造天地万物1起初。。。", "第二章制定安息日1这样", /* ... */],
  "出埃及记": ["第一章以色列在埃及兴盛1以色列的众子", "第二章摩西诞生1有一个利未家" /* ... */]
  // ...
};

const BiblePage = () => {
  const {bibleIndex, setBibleIndex} = useStateContext();
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const selectBook = (book) => {
    setBibleIndex((prevIndex) => ({
      ...prevIndex,
      book,
      chapter: 0, // Reset chapter index when a new book is selected
    }));
  };

  const selectChapter = (chapter) => {
    setBibleIndex((prevIndex) => ({
      ...prevIndex,
      chapter,
    }));
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Picker
            selectedValue={bibleIndex.book}
            onValueChange={(itemValue, itemIndex) => selectBook(itemValue)}
          >
            {Object.keys(jsonData).map((book, index) => (
              <Picker.Item key={index} label={book} value={book} />
            ))}
          </Picker>
          <Picker
            selectedValue={bibleIndex.chapter}
            onValueChange={(itemValue, itemIndex) => selectChapter(itemIndex)}
          >
            {jsonData[bibleIndex.book].map((chapter, index) => (
              <Picker.Item key={index} label={`第${index + 1}章`} value={index} />
            ))}
          </Picker>
          <Button onPress={closeModal} title="Confirm Selection" />
        </View>
      </Modal>

      {/* Display the selected chapter's text */}
      <Text style={styles.bibleText}>
        {jsonData[bibleIndex.book][bibleIndex.chapter]}
      </Text>

      {/* Button fixed at the bottom of the screen */}
      <View style={styles.fixedView}>
        <Button onPress={openModal} title="Choose a book and chapter" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // This ensures the button is at the bottom
  },
  modalView: {
    marginTop: 22,
  },
  bibleText: {
    margin: 10,
  },
  fixedView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    padding: 10,
  },
});

export default BiblePage;