import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { Task } from '../models/Task';
import { Database } from '../database/Database';
import { colors } from '../../styles/colors';

export default function TasksScreen({
    route
}) {

    const user = route.params?.user;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('Média');
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');

    function loadTasks() {

        try {
            const result =
                Database.getTasks(user.id);
            setTasks(result);

        } catch (error) {
            setError(
                'Erro ao carregar tarefas.'
            );
        }
    }
    useFocusEffect(
        useCallback(() => {
            loadTasks();
        }, [])
    );

    function saveTask() {

        try {

            const task =
                new Task(
                    title,
                    description,
                    category,
                    priority
                );

            Database.insertTask(
                user.id,
                task.getTitle(),
                task.getDescription(),
                task.getCategory(),
                task.getPriority()
            );

            setTitle('');
            setDescription('');
            setCategory('');
            setPriority('medium');
            setError('');

            loadTasks();

        } catch (error) {

            setError(
                error.message
            );
        }
    }

    function completeTask(id) {

        try {
            Database.completeTask(id);
            loadTasks();

        } catch (error) {
            setError(
                'Erro ao concluir tarefa.'
            );
        }
    }

    return (

        <ScrollView
            contentContainerStyle={styles.container}
        >

            <Text style={styles.title}>
                Tarefas
            </Text>

            <InputField
                label="Título"
                value={title}
                onChangeText={setTitle}
                placeholder="Fazer tarefa"
            />

            <InputField
                label="Descrição"
                value={description}
                onChangeText={setDescription}
                placeholder="Descrição"
            />

            <InputField
                label="Categoria"
                value={category}
                onChangeText={setCategory}
                placeholder="Escola"
            />

            <Text style={styles.label}>
                Prioridade: {priority}
            </Text>

            <PrimaryButton
                title="Baixa"
                onPress={() =>
                    setPriority('Baixa')
                }
            />
            <PrimaryButton
                title="Média"
                onPress={() =>
                    setPriority('Média')
                }
            />

            <PrimaryButton
                title="Alta"
                onPress={() =>
                    setPriority('Alta')
                }
            />
            {error ? (
                <Text style={styles.error}>
                    {error}
                </Text>
            ) : null}

            <PrimaryButton
                title="Adicionar tarefa"
                onPress={saveTask}
            />

            <Text style={styles.listTitle}>
                Tarefas cadastradas
            </Text>

            {tasks.map(task => (

                <View
                    key={task.id}
                    style={styles.task}
                >

                    <Text style={styles.taskTitle}>
                        {task.title}
                    </Text>

                    <Text>
                        {task.description}
                    </Text>

                    <Text style={styles.category}>
                        {task.category} · {task.priority}
                    </Text>

                    <Text style={styles.status}>
                        Status: {task.status}
                    </Text>

                    {task.status === 'pending' ? (

                        <PrimaryButton
                            title="Concluir"
                            onPress={() =>
                                completeTask(task.id)
                            }
                        />

                    ) : null}

                </View>
            ))}

        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        padding: 24,
        gap: 12,
        backgroundColor: colors.background
    },

    title: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.text,
        marginBottom: 10
    },

    label: {
        fontWeight: '700',
        color: colors.text
    },

    error: {
        color: colors.error,
        fontWeight: '600'
    },

    listTitle: {
        fontSize: 21,
        fontWeight: '800',
        color: colors.text,
        marginTop: 20
    },

    task: {
        backgroundColor: colors.surface,
        padding: 16,
        borderRadius: 16,
        gap: 6
    },

    taskTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.text
    },

    category: {
        color: colors.primary,
        fontWeight: '700'
    },

    status: {
        color: colors.textLight
    }
});