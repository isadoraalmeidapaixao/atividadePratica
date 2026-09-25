import { View, Text, StyleSheet } from 'react-native';

export default function TaskCard({ model }) {

    try {

        if (!model) {
            return (
                <View style={styles.card}>
                    <Text>
                        Informação indisponível.
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.card}>

                <Text style={styles.icon}>
                    {model.getIcon()}
                </Text>

                <View>

                    <Text style={styles.title}>
                        {model.title}
                    </Text>

                    <Text style={styles.value}>
                        {model.getFormattedValue()}
                    </Text>

                </View>

            </View>
        );

    } catch (error) {

        return (
            <View style={styles.card}>
                <Text>
                    Erro ao carregar card.
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    card: {
        flexDirection: 'row',
        alignItems: 'center',

        backgroundColor: '#FFFFFF',

        padding: 18,

        borderRadius: 18,

        marginBottom: 12
    },

    icon: {
        fontSize: 30,
        marginRight: 15
    },

    title: {
        fontSize: 17,
        fontWeight: '800',
        color: '#222'
    },

    value: {
        marginTop: 5,
        color: '#777'
    }
});