import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function InputField({ label, value,
    onChangeText,
    placeholder, ...props
}) {

    return (

        <View style={styles.container}>

            <Text style={styles.label}>
                {label}
            </Text>

            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                {...props}
            />

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        gap: 6
    },

    label: {
        fontWeight: '700',
        color: '#333'
    },

    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 12,
        padding: 14,
        backgroundColor: '#FFF'
    }
});