import {
    StyleSheet,
} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    listContent: {
      padding: 16,
    },
    card: {
      flexDirection: 'row',
      marginBottom: 16,
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: '#f8f8f8',
      elevation: 2,
    },
    image: {
      width: 100,
      height: 100,
    },
    info: {
      flex: 1,
      padding: 12,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    date: {
      fontSize: 14,
      color: '#555',
    },
    status: {
      fontSize: 14,
      color: '#007BFF',
      marginTop: 4,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: '#555',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      fontSize: 16,
      color: '#ff4d4d',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 16,
      color: '#555',
    },
  });
  