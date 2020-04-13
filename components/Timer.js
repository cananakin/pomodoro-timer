import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import PropTypes from 'prop-types'

const TextTimer = (timer) => {
    console.log(timer)
    return timer === 'workTime' ? 'breakTime' : 'workTime';
}

export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: 'workTime',
            minutes: 25,
            seconds: 0,
            workTime: {
                mins:25,
                secs:0
            },
            breakTime: {
                mins:5,
                secs:0
            },
            btnType: 'Pause'
        }
    }

    componentDidMount() {
        this.intervalSeconds = setInterval(this.secondsDec, 1000)
    }
    
    secondsDec = () => {
        //console.log('sec',this.state.seconds, this.state.minutes)
        // if(this.state.seconds === 1 && this.state.minutes === '0'){
        //     //clearInterval(this.intervalSeconds);
        //     // this.setState( prevState => ({
        //     //    timer: TextTimer(prevState.timer)
        //     // }))
        //     //this.onTimerHandler('Reset')
        //     return false
        // }
        if(this.state.seconds === 0){
            this.setState({ seconds: 59 });
            this.minutesDec();
        }else{
            this.setState((prevState) => { return { seconds: prevState.seconds - 1} });
        }
    }

    minutesDec = () => {
        //console.log('min',this.state.seconds, this.state.minutes)
        if(this.state.minutes === 0){
            this.setState(prevState => ({ 
                minutes: (prevState.timer === 'workTime' ?  prevState.breakTime.mins : prevState.workTime.mins),
                seconds: (prevState.timer === 'workTime' ?  prevState.breakTime.secs : prevState.workTime.secs),
                timer: TextTimer(prevState.timer)//prevState.timer === 'workTime' ? 'breakTime' : 'workTime'
            }));
        }else{
            this.setState((prevState) => { return { minutes: prevState.minutes - 1 } });
        }
    }

    onChangeTimer = (text, timer, type ) => {
        const time = {...this.state[timer]};
        time[type] = Number(text);
        if(timer === this.state.timer) {
            console.log(Number(time['secs']))
            this.setState({
                [timer]: time,
                btnType: 'Start',
                minutes: Number(time['mins']), 
                seconds: Number(time['secs'])
            });
            clearInterval(this.intervalSeconds)
        }else {
            this.setState({
                [timer]: time,
            });
        }
        //console.log(/^\d+$/.test(text))
    }

    onTimerHandler = (type) => {
        const timer = this.state.timer;
        if(type === 'Reset') {
            this.setState({ 
                minutes: this.state[timer]['mins'], 
                seconds: this.state[timer]['secs']
            });
        }else if(type === 'Pause'){
            clearInterval(this.intervalSeconds);
            this.setState({
                btnType: 'Start'
            });
        }else{
            this.intervalSeconds = setInterval(this.secondsDec, 1000)
            this.setState({
                btnType: 'Pause'
            });
        }
        
    }

    render() {
        const seconds = (
            this.state.seconds === 0 ? '00' : this.state.seconds < 10 ? '0' + this.state.seconds : this.state.seconds
             
        );
        return (
            <View style={styles.view}>
                <Text style={styles.text}>{ this.state.timer === 'workTime' ? 'Work Timer' : 'Break Timer'}</Text>
                <Text style={styles.timer}> {this.state.minutes === 0 ? '00' : this.state.minutes } : { seconds } </Text>
                <View style={styles.buttonView}>
                    <Button title={this.state.btnType} onPress={() => this.onTimerHandler(this.state.btnType)} />
                    <Button title='Reset' onPress={() => this.onTimerHandler('Reset')} />
                </View>
                <View style={styles.inputGroupView}>
                    <View style={styles.groupTextView}>
                        <Text style={styles.groupText}>Work Time: </Text>
                    </View>
                    <View style={styles.inputLabelView}>
                        <Text style={styles.label}>Mins: </Text>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput 
                            keyboardType='numeric'
                            style={styles.input} 
                            numeric
                            value={this.state.workTime.mins.toString()}
                            onChangeText={(text) => this.onChangeTimer(text,'workTime','mins')} 
                             />
                    </View>
                    <View style={styles.inputLabelView}>
                        <Text style={styles.label}>Secs: </Text>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput 
                            keyboardType='numeric'
                            style={styles.input} 
                            value={this.state.workTime.secs.toString()} 
                            onChangeText={(text) => this.onChangeTimer(text,'workTime','secs')} />
                    </View>
                </View>
                <View style={styles.inputGroupView}>
                    <View style={styles.groupTextView}>
                        <Text style={styles.groupText}>Break Time: </Text>
                    </View>
                    <View style={styles.inputLabelView}>
                        <Text style={styles.label}>Mins: </Text>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput 
                            keyboardType='numeric'
                            style={styles.input} 
                            numeric
                            value={this.state.breakTime.mins.toString()}
                            onChangeText={(text) => this.onChangeTimer(text,'breakTime','mins')} 
                             />
                    </View>
                    <View style={styles.inputLabelView}>
                        <Text style={styles.label}>Secs: </Text>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput 
                            keyboardType='numeric'
                            style={styles.input} 
                            value={this.state.breakTime.secs.toString()} 
                            onChangeText={(text) => this.onChangeTimer(text,'breakTime','secs')} />
                    </View>
                </View>
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 60,
        fontWeight: "bold"
    },
    timer: {
      fontSize: 60,
      
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    inputGroupView: {
        flexDirection: 'row',
        //flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        padding: 25,
        borderColor: 'gray', 
        borderWidth: 1,
        backgroundColor: '#eeeeee'
    },
    
    groupTextView: {
        flex: 0.5,
        paddingHorizontal: 5
    },
    inputLabelView: {
        flex: 0.2,
        paddingHorizontal: 5,
    },
    inputView : {
        flex: 0.3,
        marginRight: 10,
        
    },
    
    groupText: { 
        fontWeight: 'bold', 
        fontSize:13,
        paddingLeft: 20
    },
    label: {
        fontWeight: '500',
        fontSize: 13
    },
    input : {
        height: 20, 
        width: 65,
        color: '#000',
        borderColor: 'gray', 
        borderWidth: 1,
        backgroundColor: 'white'
    }
  });