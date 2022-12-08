import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    firstInside: {
        justifyContent: 'center',
        margin: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#000000',
        opacity: 0.3,
        justifyContent: "center",
        alignItems: "center",
    },
    
});

export default styles;