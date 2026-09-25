import { useState } from 'react';

import {
    KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text,
    View
} from 'react-native';

import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';

import { User } from '../models/User';
import { Database } from '../database/Database';
import { colors } from '../../styles/colors';

export default function LoginScreen({
    navigation
}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function handleLogin() {
        try {
            const userData =
                Database.getUser(
                    email,
                    password
                );

            if (!userData) {
                throw new Error(
                    'E-mail ou senha incorretos.'
                );
            }
            const user =
                new User(
                    userData.id,
                    userData.name,
                    userData.email,
                    userData.password
                );
            setErrorMessage('');

            navigation.replace(
                'Home',
                {
                    user: user.toObject()
                }
            );

        } catch (error) {
            setErrorMessage(
                error.message
            );
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.keyboardArea}
            behavior={
                Platform.OS === 'ios' ? 'padding' : undefined
            }
        >

            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >

                <View style={styles.header}>

                    <Text style={styles.logo}>
                        TaskSync
                    </Text>

                    <Text style={styles.title}>
                        Bem Vindo ao TaskSync!
                    </Text>

                    <Text style={styles.subtitle}>
                        Organize suas tarefas
                    </Text>

                </View>

                <View style={styles.form}>
                    <InputField
                        label="E-mail"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Digite seu e-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <InputField
                        label="Senha"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Digite sua senha"
                        secureTextEntry
                    />

                    {errorMessage ? (
                        <Text style={styles.error}>
                            {errorMessage}
                        </Text>
                    ) : null}

                    <PrimaryButton
                        title="Entrar"
                        onPress={handleLogin}
                    />

                    <Text style={styles.hint}>
                        aluno@senac.com
                    </Text>

                </View>

            </ScrollView>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

    keyboardArea: {
        flex: 1,
        backgroundColor: colors.background
    },

    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
        gap: 35
    },

    header: {
        alignItems: 'center'
    },

    logo: {
        color: colors.primary,
        fontSize: 58,
        fontWeight: '800'
    },

    title: {
        color: colors.text,
        fontSize: 28,
        fontWeight: '800',
        textAlign: 'center'
    },

    subtitle: {
        marginTop: 8,
        color: colors.textLight,
        fontSize: 15,
        textAlign: 'center'
    },

    form: {
        gap: 18
    },

    error: {
        color: colors.error,
        fontWeight: '600'
    },

    hint: {
        color: colors.textLight,
        fontSize: 12,
        textAlign: 'center'
    }
});