import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { PieChart } from 'react-native-svg-charts'

const data = [
    {
        key: "confirmed",
        value: 800000,
        svg: { fill: 'red' },
        // arc: { outerRadius: '130%', cornerRadius: 10 }
    },
    {
        key: "recoverd",
        value: 400000,
        svg: { fill: 'green' },
        // arc: { outerRadius: '130%', cornerRadius: 10 }
    },
    {
        key: "Deaths",
        value: 500000,
        svg: { fill: 'white' },
        // arc: { outerRadius: '130%', cornerRadius: 10 }
    },
]

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.parentContainer}>
                    <PieChart
                        style={{ height: 200 }}
                        outerRadius={'70%'}
                        innerRadius={10}
                        data={data}
                    />
                    <View style={styles.descContainer}>
                        <View style={styles.descCircle}></View>
                        <Text style={styles.descText}>Total Confirmed</Text>
                    </View>
                    <View style={styles.descContainer}>
                        <View style={[styles.descCircle, { backgroundColor: 'green' }]}></View>
                        <Text style={styles.descText}>Total Recoverd</Text>
                    </View>
                    <View style={styles.descContainer}>
                        <View style={[styles.descCircle, { backgroundColor: 'white' }]}></View>
                        <Text style={styles.descText}>Total Deaths</Text>
                    </View>
                    <View style={styles.descContainer}>
                        <View style={[styles.descCircle, { backgroundColor: 'pink' }]}></View>
                        <Text style={styles.descText}>Total Active</Text>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    safeArea: {
        paddingTop: 45,
        paddingBottom: 30,
        backgroundColor: '#343434',
        flex: 1
    },
    parentContainer: {
        flex: 1,
        backgroundColor: '#343434',
    },
    descContainer: {
        flexDirection: 'row',
        margin: 10,
        marginLeft: 20,
        alignItems: 'center'
    },
    descCircle: {
        backgroundColor: 'red',
        width: 10,
        height: 10,
        borderRadius: 5
    },
    descText: {
        color: '#fff',
        fontWeight: '700',
        marginLeft: 20
    }
})