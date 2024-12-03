import {
    StyleSheet,
} from 'react-native';
import { colors } from '@/app/themes/colors';
import { units } from '@/app/themes/units';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND,
    },
    topbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bodyContainer: {
        paddingHorizontal: units.width / 14,
        marginTop: units.height / 90,
        marginBottom: units.height / 101,
    },
    title: {
        fontSize: 30,
        lineHeight: 30,
        fontWeight: '700',
        color: colors.DARK,
        marginTop: units.height / 30,
    },
    optionsContainer: {
        backgroundColor: colors.WHITE,
        borderRadius: 14,
        paddingHorizontal: units.width / 23,
        paddingVertical: units.height / 50,
        shadowColor: colors.DARK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginLeft: units.width / 21,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: units.height / 45,
    },
    list: {
        backgroundColor: colors.WHITE,
        marginTop: units.height / 40,
    },
    cardContainer: {
        marginTop: units.height / 27,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: 18,
        lineHeight: 18,
        fontWeight: '600',
        color: colors.DARK,
    },
    viewButton: {
        color: colors.BLUE, 
        fontSize: 13,
        lineHeight: 13,
        fontWeight: '500',
    },
    listContainer: {
        paddingVertical: units.height / 50,
    },
    // after
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        elevation: 3,
      },
      image: {
        width: 100,
        height: 100,
        borderRadius: 5,
      },
      info: {
        flex: 1,
        marginLeft: 10,
      },
      name: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      rating: {
        fontSize: 14,
        color: '#4caf50',
      },
      distance: {
        fontSize: 14,
        color: '#888',
      },
      price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 5,
      },
      amenity: {
        fontSize: 12,
        color: '#007BFF',
      },
      button: {
        marginTop: 10,
        backgroundColor: colors.BLUE, 
        // backgroundColor: '#f57c00',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
      }
});