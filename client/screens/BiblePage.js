import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Modal, Button, StyleSheet, Alert, ScrollView, StatusBar } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import { useStateContext } from '../contexts/ContextProvider';
import { useTranslation } from 'react-i18next';
import bibleZH from '../assets/data/bible-zh.json';

const BiblePage = () => {
  const { i18n, t } = useTranslation();
  const {bibleIndex, setBibleIndex, highlightedText} = useStateContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [bibleData, setBibleData] = useState(bibleZH);
  const scrollViewRef = useRef();

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

  useEffect(() => {
    if (highlightedText) {
      const bibleText = bibleData[bibleIndex.book][bibleIndex.chapter];
      const highlightedIndex = bibleText.indexOf(highlightedText);
      if (highlightedIndex !== -1) {
        scrollViewRef.current.scrollTo({
          y: Number.parseInt(highlightedIndex/16)*30, // 假设缩放因子为 2
          animated: true,
        });
      }
    }
  }, [highlightedText, bibleIndex, bibleData]);

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
      // If it's the first chapter of the book
      const currentBookIndex = Object.keys(bibleData).indexOf(bibleIndex.book);
      if (currentBookIndex === 0) {
        // If it's the first book, show alert
        Alert.alert(t("BiblePage_No_Previous_Alert"));
      } else {
        // Go to the last chapter of the previous book
        const previousBook = Object.keys(bibleData)[currentBookIndex - 1];
        setBibleIndex({
          book: previousBook,
          chapter: bibleData[previousBook].length - 1,
        });
      }
    } else {
      // Go to the previous chapter of the current book
      setBibleIndex((prevIndex) => ({
        ...prevIndex,
        chapter: prevIndex.chapter - 1,
      }));
    }
  };
  
  const goToNextChapter = () => {
    if (bibleIndex.chapter === bibleData[bibleIndex.book].length - 1) {
      // If it's the last chapter of the book
      const currentBookIndex = Object.keys(bibleData).indexOf(bibleIndex.book);
      if (currentBookIndex === Object.keys(bibleData).length - 1) {
        // If it's the last book, show alert
        Alert.alert(t("BiblePage_No_Next_Alert"));
      } else {
        // Go to the first chapter of the next book
        const nextBook = Object.keys(bibleData)[currentBookIndex + 1];
        setBibleIndex({
          book: nextBook,
          chapter: 0,
        });
      }
    } else {
      // Go to the next chapter of the current book
      setBibleIndex((prevIndex) => ({
        ...prevIndex,
        chapter: prevIndex.chapter + 1,
      }));
    }
  };

  const renderBibleText = () => {
    const bibleText = bibleData[bibleIndex.book][bibleIndex.chapter];
    if (!highlightedText) {
      return <Text style={styles.bibleText}>{bibleText}</Text>;
    }
  
    const parts = bibleText.split(new RegExp(`(${highlightedText})`));
    return (
      <Text style={styles.bibleText}>
        {parts.map((part, index) =>
          part === highlightedText ? (
            <Text key={index} style={styles.highlightedText}>
              {part}
            </Text>
          ) : (
            <Text key={index}>{part}</Text>
          )
        )}
      </Text>
    );
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
        <ScrollView ref={scrollViewRef} style={styles.scrollView}>
          {renderBibleText()}
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
    paddingTop: StatusBar.currentHeight,
    flex: 1,
  },
  modalView: {
    marginTop: 22,
  },
  bibleText: {
    fontSize:22,
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
  highlightedText: {
    backgroundColor: '#FA7070',
    fontStyle: 'italic',
  },
});

export default BiblePage;