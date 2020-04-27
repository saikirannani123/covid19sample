import React, { Component } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Text, ActivityIndicator } from 'react-native';

export default class SignInButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <View>
                <TouchableWithoutFeedback onPress={this.props.onPress}>
                    <View style={[styles.mainContainer, { margin: 10 }]}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.subHead}>Total Confirmed : <Text style={styles.valueText}>{this.props.confirmed}</Text></Text>
                        <Text style={styles.subHead}>Total Recovered : <Text style={styles.valueText}>{this.props.recovered}</Text></Text>
                        <Text style={styles.subHead}>     Total Deaths : <Text style={styles.valueText}>{this.props.deaths}</Text></Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 180,
        minWidth: 120,
        maxWidth: 250,
        backgroundColor: '#474747',
        borderRadius: 10
    },
    title: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '900',
        marginBottom: 10,
        marginTop: 10

    },
    subHead: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 10,
        marginRight: 10,
        textAlign: 'right'
    },
    valueText: {
        color: '#DADEBC',
        fontSize: 12,
        marginLeft: 10,
        marginRight: 10
    }
})