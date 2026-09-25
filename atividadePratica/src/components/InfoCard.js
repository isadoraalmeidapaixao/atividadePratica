import { View, Text, StyleSheet } from 'react-native';

export default function InfoCard({ icon, value, title }) {

    return (

        <View style={styles.card}>

            <Text style={styles.icon}>
                {icon}
            </Text>

            <Text style={styles.value}>
                {value}
            </Text>
            <Text style={styles.title}>
                {title}
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16
    },
    icon: {
        fontSize: 20
    },
    value: {
        fontSize: 24,
        fontWeight: '800',
        marginTop: 5
    },
    title: {
        color: '#777',
        marginTop: 4
    }
});