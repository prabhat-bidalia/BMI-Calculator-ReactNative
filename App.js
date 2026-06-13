import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, Keyboard } from 'react-native';

const App = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [gender, setGender] = useState('male');
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');

    const calculateBmi = () => {
        Keyboard.dismiss();

        const w = parseFloat(weight);
        const h = parseFloat(height);

        if (!w || !h || w <= 0 || h <= 0) {
            Alert.alert("Invalid Input", "Please enter valid values for height and weight.");
            return;
        }

        const bmiValue = (w / ((h / 100) * (h / 100))).toFixed(1);
        setBmi(bmiValue);

        let resCategory = '';
        if (bmiValue < 18.5) resCategory = 'Underweight';
        else if (bmiValue <= 24.9) resCategory = 'Healthy';
        else if (bmiValue <= 29.9) resCategory = 'Overweight';
        else if (bmiValue <= 34.9) resCategory = 'Obese';
        else resCategory = 'Extremely Obese';

        setCategory(resCategory);
    };
    
    const getThemeColor = () => {
        if (!bmi) return '#6C5CE7';
        if (category === 'Healthy') return '#2ECC71';
        if (category === 'Underweight') return '#3498DB';
        if (category === 'Overweight') return '#F1C40F';
        return '#E74C3C';
    };

    const themeColor = getThemeColor();

    return (
        <View style={styles.container}>
            <Text style={[styles.head, { color: themeColor }]}>BMI Calculator</Text>

            <View style={styles.genderContainer}>
                <TouchableOpacity 
                    style={[styles.genderBox, gender === 'male' && { borderColor: '#3498DB', backgroundColor: '#EBF5FB' }]} 
                    onPress={() => setGender('male')}>
                    <Text style={[styles.genderText, gender === 'male' && { color: '#3498DB' }]}>👨 Male</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.genderBox, gender === 'female' && { borderColor: '#E84393', backgroundColor: '#FDscale' }]} 
                    onPress={() => setGender('female')}>
                    <Text style={[styles.genderText, gender === 'female' && { color: '#E84393' }]}>👩 Female</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Height (cm)"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={height}
                onChangeText={(h) => { setHeight(h); setBmi(null); }}
            />
            <TextInput
                style={styles.input}
                placeholder="Weight (kg)"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={weight}
                onChangeText={(w) => { setWeight(w); setBmi(null); }}
            />

            <TouchableOpacity style={[styles.btn, { backgroundColor: themeColor }]} onPress={calculateBmi}>
                <Text style={styles.btnText}>Calculate BMI</Text>
            </TouchableOpacity>

            {bmi && (
                <View style={[styles.resultCard, { borderColor: themeColor }]}>
                    <Text style={styles.resultLabel}>YOUR BMI</Text>
                    <Text style={[styles.bmiScore, { color: themeColor }]}>{bmi}</Text>
                    <Text style={[styles.categoryText, { color: themeColor }]}>{category.toUpperCase()}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#F5F6FA',
    },
    head: {
        fontSize: 32,
        fontWeight: '900',
        marginBottom: 30,
        letterSpacing: 1,
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 25,
    },
    genderBox: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingVertical: 15,
        marginHorizontal: 5,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E1E8ED',
        elevation: 2, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    genderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#657786',
    },
    input: {
        borderRadius: 12,
        marginBottom: 16,
        height: 55,
        borderWidth: 1.5,
        borderColor: '#E1E8ED',
        width: '100%',
        fontSize: 16,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        color: '#333',
    },
    btn: {
        width: '100%',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        elevation: 3,
    },
    btnText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultCard: {
        marginTop: 35,
        backgroundColor: '#FFF',
        width: '100%',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        borderWidth: 2,
        elevation: 4,
    },
    resultLabel: {
        fontSize: 14,
        color: '#888',
        fontWeight: '700',
        letterSpacing: 1,
    },
    bmiScore: {
        fontSize: 48,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    categoryText: {
        fontSize: 18,
        fontWeight: '800',
        letterSpacing: 0.5,
    }
});

export default App;
