import React, { Component } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Text, ActivityIndicator } from 'react-native';

export default class SignInButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render(){
        return(
            <View style={styles.mainContainer}>
                <TouchableWithoutFeedback onPress={this.props.onPress}>
                    <View style={[styles.buttonStyle,{borderRadius: this.props.loading ? 25 : 10}]}>
                        {this.props.loading ? 
                        <ActivityIndicator size={'small'} color={'#197BEB'}/>
                        :
                        <Text style={styles.buttonText}>{this.props.buttonText}</Text>
                        }
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
    },
    buttonStyle: {
        backgroundColor: '#DADEBC',
        height: 50,
        minWidth: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 14,
        color: '#474747',
        margin: 10,
        fontWeight: '700'
    }
})