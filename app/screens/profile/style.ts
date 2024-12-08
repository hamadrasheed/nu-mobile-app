import { colors } from '@/app/themes/colors';
import {
    StyleSheet,
} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    profileContainer: {
        width: '100%',
        marginBottom: 40,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    logoutButton: {
        width: '80%',
        padding: 15,
        backgroundColor: colors.BLUE, //'#ff4d4d',
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    deactivateButton: {
        width: '80%',
        backgroundColor: '#d9534f', // Red color for danger action
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
      },
      deactivateText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
});
