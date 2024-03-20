import React, {useState} from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

const SettingsPage = () => {
    // 当前选中的语言
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    const { t } = useTranslation();
    const changeLanguage = (language) => {
        setSelectedLanguage(language);
        i18n.changeLanguage(language);
    };

    return (
        <View style={styles.container}>
            <Text>{t("SettingsPage_Select_Language")}</Text>
            <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) => changeLanguage(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="English" value="en" />
                <Picker.Item label="中文" value="zh" />
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    picker: {
        width: 200,
        height: 44,
    },
});

export default SettingsPage;
