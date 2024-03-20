import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import { useStateContext } from '../contexts/ContextProvider';
import { useTranslation } from 'react-i18next';
import bibleZH from '../assets/data/bible-zh.json';

const BiblePage = () => {
  const { i18n } = useTranslation();
  const {bibleIndex, setBibleIndex} = useStateContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [bibleData, setBibleData] = useState(bibleZH);

  useEffect(() => {
    // 根据i18n.language设置相应的圣经文本数据
    switch (i18n.language) {
      case 'zh':
        setBibleData(bibleZH);
        break;
      default:
        setBibleData(bibleZH); // 默认为英文
    }
  }, [i18n.language]);

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

  const goToPreviousChapter = () => {
    if (bibleIndex.chapter === 0) {
      Alert.alert("No previous chapters", "You are at the beginning of the book.");
    } else {
      setBibleIndex((prevIndex) => ({
        ...prevIndex,
        chapter: prevIndex.chapter - 1,
      }));
    }
  };

  const goToNextChapter = () => {
    if (bibleIndex.chapter === bibleData[bibleIndex.book].length - 1) {
      Alert.alert("No more chapters", "You have reached the end of the book.");
    } else {
      setBibleIndex((prevIndex) => ({
        ...prevIndex,
        chapter: prevIndex.chapter + 1,
      }));
    }
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
            {Object.keys(bibleData).map((book, index) => (
              <Picker.Item key={index} label={book} value={book} />
            ))}
          </Picker>
          <Picker
            selectedValue={bibleIndex.chapter}
            onValueChange={(itemValue, itemIndex) => selectChapter(itemIndex)}
          >
            {bibleData[bibleIndex.book].map((chapter, index) => (
              <Picker.Item key={index} label={`第${index + 1}章`} value={index} />
            ))}
          </Picker>
          <Button onPress={closeModal} title="Confirm Selection" />
        </View>
      </Modal>
      {!modalVisible && 
      <React.Fragment>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.bibleText}>
            {bibleData[bibleIndex.book][bibleIndex.chapter]}
          </Text>
        </ScrollView>
        <View style={styles.navigationContainer}>
          <View style={styles.navButton}><Button onPress={goToPreviousChapter} title="<" /></View>
          <View style={styles.titleButton}><Button onPress={openModal} title={bibleIndex.book} /></View>
          <View style={styles.navButton}><Button onPress={goToNextChapter} title=">" /></View>
        </View>
        </React.Fragment>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  modalView: {
    marginTop: 22,
  },
  bibleText: {
    margin: 10,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  navButton: {
    flex: 1, 
  },
  titleButton: {
    flex: 8, 
  },
  scrollView: {
    flex: 1, // 使得 ScrollView 占据除导航栏外的所有可用空间
  },
});

export default BiblePage;