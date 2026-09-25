import { Pressable, StyleSheet, Text } from 'react-native';

export default function PrimaryButton({ title, onPress }) {

    return (
        <Pressable
            style={styles.button}
            onPress={onPress}
        >
            <Text style={styles.text}>
                {title}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({

    button: {
        backgroundColor: '#5B5BD6',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center'
    },

    text: {
        color: '#FFF',
        fontWeight: '800'
    }
});