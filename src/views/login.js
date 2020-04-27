import React, { Component } from "react";
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import SignInButton from '../components/signinButton'
import ScrollComponent from '../components/scrollComponent'
import Modal from 'react-native-modal'
import AsyncStorage from '@react-native-community/async-storage'
import { getSummary, getStats, getLiveByCountry, getByCountry } from 'actions/dataAction'
import { connect } from 'react-redux'
import { PieChart } from 'react-native-svg-charts'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            isVisible: false,
            token: '',
            showData: false,
            dataLoading: false,
            summary: [],
            worldTotal: [],
            countrylive: [],
            byCountry: [],
            showGraph: false
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('token').then((response) => {
            if (__DEV__) {
                console.log(response)
            }
            if(response !== null && response !== undefined && response !== ''){
 this.setState({ token: response, dataLoading: true, showData: true }, () => {
                this.getCovidData()
            })
            }
        }).catch(error => {
            if (__DEV__) {
                console.log(error)
            }
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({ dataLoading: false })
        if (__DEV__) {
            console.log("RESPONSE ========", nextProps)
        }
        if (nextProps.summary.length !== 0) {
            this.setState({ summary: nextProps.summary.Global })
        }
        if (nextProps.worldTotal.length !== 0) {
            this.setState({ worldTotal: nextProps.worldTotal })
        }
        if (nextProps.countrylive.length !== 0) {
            this.setState({ countrylive: nextProps.countrylive[0] })
        }
        if (nextProps.byCountry.length !== 0) {
            this.setState({ byCountry: nextProps.byCountry[nextProps.byCountry.length - 1] })
        }
    }

    //signin Anonymously
    signin = async () => {
        auth()
            .signInAnonymously()
            .then((response) => {
                AsyncStorage.setItem('token', response.user.uid)
                setTimeout(() => {
                    this.setState({ loading: false, token: response.user.uid, isVisible: true },()=>{

                    })
                }, 2000)
                if (__DEV__) {
                    console.log('User signed in anonymously ======',  response.user.uid);
                }
            })
            .catch(error => {
                this.setState({
                    token: ''
                })
                if (error.code === 'auth/operation-not-allowed') {
                    if (__DEV__) {
                        console.log('Enable anonymous in your firebase console.');
                    }
                }
                alert("Failed to login anonymously")
            });
    }

    //Siginout button click
    onPressLogout = () => {
        this.setState({ loading: true }, () => {
            setTimeout(() => {
                AsyncStorage.setItem('token', '')
                this.setState({ token: '', loading: false, showData: false })
            }, 2000)
        })
    }

    //ok button click
    modalOkTap = () => {
        this.setState({ isVisible: false, showData: true, dataLoading: true }, () => {
            this.getCovidData()
        })
    }

    //api hit calling function
    getCovidData = () => {
        this.props.getSummary()
        this.props.getStats()
        this.props.getByCountry()
        this.props.getLiveByCountry()
    }

    //tatistics page  navigation function
    gotoStats = () => {
        this.props.navigation.navigate('Stats')
    }

    onPressDetail = (item) => {
        let confirmed = 0
        let recoverd = 0
        let deaths = 0

if(item === 1){
    confirmed = this.state.summary.TotalConfirmed
    recoverd = this.state.summary.TotalRecovered
    deaths = this.state.summary.TotalDeaths
}else if(item === 2){
    confirmed= this.state.countrylive.Confirmed
    recoverd= this.state.countrylive.Recovered
    deaths= this.state.countrylive.Deaths
}else if(item === 3){
    confirmed = this.state.byCountry.Confirmed
    recoverd = this.state.byCountry.Recovered
    deaths = this.state.byCountry.Deaths
}else {
    confirmed= this.state.worldTotal.TotalConfirmed
    recoverd= this.state.worldTotal.TotalRecovered 
    deaths= this.state.worldTotal.TotalDeaths 
}

this.setState({
    data:[
        {
            key: "confirmed",
            value: confirmed,
            svg: { fill: 'red' },
            // arc: { outerRadius: '130%', cornerRadius: 10 }
        },
        {
            key: "recoverd",
            value: recoverd,
            svg: { fill: 'green' },
            arc: { outerRadius: '130%', cornerRadius: 10 }
        },
        {
            key: "Deaths",
            value: deaths,
            svg: { fill: 'white' },
            // arc: { outerRadius: '130%', cornerRadius: 10 }
        },
    ],
    showGraph: true
})

    }

    //Render data if signed in
    renderCovidData = () => {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ alignItems: 'flex-end', margin: 15 }}>
                    <SignInButton
                        onPress={() => { this.onPressLogout() }}
                        buttonText={'SIGN OUT'}
                        loading={this.state.loading}
                    />
                </View>
                {this.state.dataLoading ? <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <ActivityIndicator size={'large'} color={'#197BEB'} />
                    <Text style={{ color: '#fff', fontWeight: '700', top: 10 }}>Loading ...</Text>
                </View> : <View style={{ flex: 1, marginTop: 20 }}>
                        <ScrollView horizontal>
                            {this.state.summary.length !== 0 &&
                                <ScrollComponent title={'SUMMARY'}
                                    confirmed={this.state.summary.TotalConfirmed}
                                    recovered={this.state.summary.TotalRecovered}
                                    deaths={this.state.summary.TotalDeaths}
                                    onPress={()=> this.onPressDetail(1)}
                                />}
                            {this.state.countrylive.length !== 0 &&
                                <ScrollComponent title={'COUNTRY LIVE'}
                                    confirmed={this.state.countrylive.Confirmed}
                                    recovered={this.state.countrylive.Recovered}
                                    deaths={this.state.countrylive.Deaths}
                                    onPress={()=> this.onPressDetail(2)}
                                />}

                            {this.state.byCountry.length !== 0 &&
                                <ScrollComponent title={'BY COUNTRY'}
                                    confirmed={this.state.byCountry.Confirmed}
                                    recovered={this.state.byCountry.Recovered}
                                    deaths={this.state.byCountry.Deaths}
                                    onPress={()=> this.onPressDetail(3)}
                                />}
                            {this.state.worldTotal.length !== 0 &&
                                <ScrollComponent title={'WORLD TOTAL'}
                                    confirmed={this.state.worldTotal.TotalConfirmed}
                                    recovered={this.state.worldTotal.TotalRecovered}
                                    deaths={this.state.worldTotal.TotalDeaths}
                                    onPress={()=> this.onPressDetail(4)}
                                />}
                        </ScrollView>
                        {this.state.showGraph && 
                        <View>
                            <PieChart
                        style={{ height: 200 }}
                        outerRadius={'70%'}
                        innerRadius={10}
                        data={this.state.data}
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
                    </View>
                    }
                    </View>}
            </View>
        )
    }


    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.parentContainer}>
                    {this.state.showData === false ?
                        <View style={[styles.parentContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                            <SignInButton
                                onPress={() => {
                                    this.setState({ loading: !this.state.loading }, () => {
                                        this.signin()
                                    })
                                }}
                                loading={this.state.loading}
                                buttonText={'SIGN IN TO CONTINUE'}
                            />
                        </View> :
                        this.renderCovidData()
                    }
                    <Modal
                        isVisible={this.state.isVisible}
                    >
                        <View style={styles.modalContainer}>
                            <Text style={styles.successText}>{`Signin Successful with uid ${this.state.token}`}</Text>
                            <TouchableOpacity style={styles.modalButton} onPress={() => { this.modalOkTap() }}>
                                <Text style={[styles.successText, { color: '#474747' }]}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => {
    const {
        summary,
        summaryFailed,
        worldTotal,
        worldTotalFailed,
        countrylive,
        liveFailed,
        byCountry,
        byCountryFailed } = state.DataReducer

    return {
        summary,
        summaryFailed,
        worldTotal,
        worldTotalFailed,
        countrylive,
        liveFailed,
        byCountry,
        byCountryFailed
    }
}

export default connect(
    mapStateToProps,
    {
        getSummary, getStats, getLiveByCountry, getByCountry
    }
)(Login)

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
    modalContainer: {
        backgroundColor: '#474747',
        borderRadius: 10,
        width: '75%',
        alignSelf: 'center'
    },
    successText: {
        fontWeight: '600',
        fontSize: 14,
        margin: 10,
        color: 'white'
    },
    modalButton: {
        backgroundColor: '#DADEBC',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 5
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