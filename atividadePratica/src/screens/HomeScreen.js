import { useEffect, useState } from 'react';

import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';

import InfoCard from '../components/InfoCard';
import PrimaryButton from '../components/PrimaryButton';

import { PendingTaskCardModel } from '../models/PendingTaskCardModel';
import { CompletedTaskCardModel } from '../models/CompletedTaskCardModel';

import { Database } from '../database/Database';
import { colors } from '../../styles/colors';
import TaskCard from '../models/TaskCard';

export default function HomeScreen({
    route,
    navigation
}) {

    const user =
        route.params?.user ?? {
            id: null,
            name: 'Estudante',
            email: ''
        };

    const [tasks, setTasks] =
        useState([]);

    function loadTasks() {

        try {

            if (!user.id) {
                return;
            }

            const result =
                Database.getTasks(user.id);

            setTasks(result);

        } catch (error) {

            console.error(
                'Erro ao carregar tarefas:',
                error
            );
        }
    }

    useEffect(() => {
        loadTasks();
    }, []);

    const pending =
        tasks.filter(
            task => task.status === 'pending'
        ).length;

    const completed =
        tasks.filter(
            task => task.status === 'completed'
        ).length;

    return (

        <SafeAreaView style={styles.safeArea}>

            <ScrollView
                contentContainerStyle={styles.container}
            >

                <Text style={styles.greeting}>
                    Olá, {user.name}!
                </Text>

                <Text style={styles.subtitle}>
                    Organize suas tarefas.
                </Text>

                <View style={styles.cards}>

                    <InfoCard
                        icon="!"
                        value={String(pending)}
                        title="Pendentes"
                    />

                    <InfoCard
                        icon="✓"
                        value={String(completed)}
                        title="Concluídas"
                    />
                </View>

                <TaskCard
                    model={
                        new PendingTaskCardModel(
                            'Tarefas pendentes',
                            pending
                        )
                    }
                />
                <TaskCard
                    model={
                        new CompletedTaskCardModel(
                            'Progresso',
                            tasks.length,
                            completed
                        )
                    }
                />
                <PrimaryButton
                    title="Tarefas"
                    onPress={() =>
                        navigation.navigate(
                            'Tasks',
                            { user }
                        )
                    }
                />
                <Text
                    style={styles.logout}
                    onPress={() =>
                        navigation.replace('Login')
                    }
                >
                    Sair
                </Text>

            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: colors.background
    },

    container: {
        flexGrow: 1,
        padding: 24,
        gap: 18
    },

    greeting: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.text
    },

    subtitle: {
        color: colors.textLight,
        fontSize: 15
    },

    cards: {
        flexDirection: 'row',
        gap: 12
    },

    logout: {
        textAlign: 'center',
        color: colors.primary,
        fontWeight: '700',
        padding: 10
    }
});