/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    FlatList,
    StatusBar
} from 'react-native';
import { SearchBar } from 'react-native-elements';

type Props = {};


const questions = require('./data/questions.json');
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            search: questions,
            searchQuery: ''
        };
        this.search = this.search.bind(this);
    }
    search(e) {
        this.setState({
            searchQuery: e
        });
        this.find(this.state.searchQuery);
    }
    find(query){
        var searchArray = [];
        questions.forEach((element, index) => {
            if(element[0].indexOf(query) != -1){
                searchArray.push(element);
            }
        });
        this.setState({
          search: searchArray
        });
    };
    render() {
        return (
            <View style={styles.application}>
                <StatusBar
                    backgroundColor="#151725"
                    barStyle="light-content"
                />
                <SearchBar
                    showLoading
                    noIcon
                    ref={(text) => this.text = text}
                    onChangeText={
                        (text) => this.setState({searchQuery}),
                        this.search
                    }
                    containerStyle={styles.search}
                    inputContainerStyle={styles.searchContainer}
                    inputStyle={styles.searchInput}
                    placeholder='Поиск' />
                <ScrollView style={styles.container}>
                    <FlatList
                        data={this.state.search}
                        renderItem={({item}) =>
                            <View style={styles.listItem}>
                                <Text style={styles.listItem_question}>{item[0]}</Text>
                                <Text style={styles.listItem_answer}>Жауабы: {item[1]}</Text>
                            </View>
                        }
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    application: {
        backgroundColor: '#1d1c29',
        height: '100%'
    },
    statusBar: {
        height: 20,
        backgroundColor: '#151725'
    },
    container: {
        padding: 5
    },
    listItem: {
        backgroundColor: '#151725',
        borderRadius: 2,
        marginBottom: 5,
        padding: 10,
    },
    listItem_question: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 16
    },
    listItem_answer: {
        color: '#FFF',
        marginTop: 3
    },
    search: {
        backgroundColor: '#151725',
        borderColor: '#151725',
        borderBottomWidth: 0,
        borderTopWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    searchInput: {
        backgroundColor: '#313142',
        margin: 5,
        padding: 10
    },
    searchContainer: {
        padding: 5
    }
});
