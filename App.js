import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    head: {
        fontSize: 30,
        color: '#333',
        fontWeight: 'bold',
        marginBottom: 25,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    inp1: {
        borderRadius: 10,
        marginBottom: 20,
        height: 50,
        borderWidth: 1,
        borderColor: 'coral',
        width: '100%',
        fontSize: 18,
        paddingLeft: 10,
        backgroundColor: '#fff',
    },
    inp2: {
        borderRadius: 10,
        marginBottom: 30,
        height: 50,
        borderWidth: 1,
        borderColor: 'coral',
        width: '100%',
        fontSize: 18,
        paddingLeft: 10,
        backgroundColor: '#fff',
    },
    btn: {
        width: '100%',
        backgroundColor: 'coral',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    result: {
        fontSize: 20,
        marginTop: 20,
        color: '#333',
        fontWeight: 'bold',
    }
});

const CalculateBmi = (weight, height) => {
    if (!weight || !height) {
        Alert.alert("Please enter both height and weight.");
        return '';
    }
    return (weight / ((height / 100) * (height / 100))).toFixed(2);
}

const Res = (bmi) => {
    let result = '';
    if (bmi < 18.5) {
        result = 'Underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        result = 'Healthy';
    } else if (bmi >= 25 && bmi <= 29.9) {
        result = 'Overweight';
    } else if (bmi >= 30 && bmi <= 34.9) {
        result = 'Obese';
    } else if (bmi >= 35) {
        result = 'Extremely obese';
    }
    return result;
}

const App = () => {
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [bmi, setBmi] = useState('');
    const [res, setRes] = useState('');
    return (
        <View style={styles.container}>
            <Text style={styles.head}>BMI Calculator</Text>
            <TextInput
                style={styles.inp1}
                placeholder="Enter your Height (cm)"
                keyboardType="numeric"
                onChangeText={(h) => setHeight(h)}
            />
            <TextInput
                style={styles.inp2}
                placeholder="Enter your Weight (kg)"
                keyboardType="numeric"
                onChangeText={(w) => setWeight(w)}
            />
            <TouchableOpacity style={styles.btn} onPress={() => setBmi(CalculateBmi(weight, height))}>
                <Text style={styles.btnText}>Calculate BMI</Text>
            </TouchableOpacity>
            {bmi ? <Text style={styles.result}>BMI : {bmi}</Text> : null}
            {bmi ? <Text style={styles.result}>Result : {Res(bmi)}</Text> : null}
        </View>
    );
};

export default App;
