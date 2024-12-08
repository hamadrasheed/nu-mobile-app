import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { createRoom } from "../../../context/roomSlice"; // Action to create a room
import { Header } from "@/components/header/header";

export const CreateRoomScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const [roomData, setRoomData] = useState({
        name: "",
        price: "",
        distance: "",
        rating: "",
        image: "",
        freeWifi: false,
        freeCancellation: false,
        breakfastIncluded: false,
        description: "",
        typeId: 1, // Default to Executive Room
    });

    const handleCreateRoom = async () => {
        if (!roomData.name || !roomData.price || !roomData.typeId) {
            Alert.alert("Error", "Please fill in all required fields.");
            return;
        }

        try {
            await dispatch(createRoom(roomData)).unwrap();
            Alert.alert("Success", "Room created successfully!");
            navigation.goBack();
        } catch (err) {
            Alert.alert("Error", err.message || "Failed to create room");
        }
    };

    return (
        <>
            <Header title="Lexus NU" />

            <View style={styles.container}>
                <Text style={styles.header}>Create New Room</Text>

                {/* Room Name */}
                <Text style={styles.label}>Room Name:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter room name"
                    value={roomData.name}
                    onChangeText={(text) => setRoomData({ ...roomData, name: text })}
                />

                {/* Room Price */}
                <Text style={styles.label}>Price:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter price (e.g., $250)"
                    value={roomData.price}
                    onChangeText={(text) => setRoomData({ ...roomData, price: text })}
                    keyboardType="numeric"
                />

                {/* Distance */}
                <Text style={styles.label}>Distance from City Center:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter distance (e.g., 5 miles)"
                    value={roomData.distance}
                    onChangeText={(text) => setRoomData({ ...roomData, distance: text })}
                />

                {/* Rating */}
                <Text style={styles.label}>Rating:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter rating (e.g., 9.1 Excellent)"
                    value={roomData.rating}
                    onChangeText={(text) => setRoomData({ ...roomData, rating: text })}
                />

                {/* Room Type (Radio Buttons) */}
                <Text style={styles.label}>Room Type:</Text>
                <View style={styles.radioGroup}>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setRoomData({ ...roomData, typeId: 1 })}
                    >
                        <View
                            style={[
                                styles.radioCircle,
                                roomData.typeId === 1 && styles.radioSelected,
                            ]}
                        />
                        <Text style={styles.radioText}>Executive Room</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setRoomData({ ...roomData, typeId: 2 })}
                    >
                        <View
                            style={[
                                styles.radioCircle,
                                roomData.typeId === 2 && styles.radioSelected,
                            ]}
                        />
                        <Text style={styles.radioText}>Deluxe Room</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setRoomData({ ...roomData, typeId: 3 })}
                    >
                        <View
                            style={[
                                styles.radioCircle,
                                roomData.typeId === 3 && styles.radioSelected,
                            ]}
                        />
                        <Text style={styles.radioText}>Standard Room</Text>
                    </TouchableOpacity>
                </View>

                {/* Submit Button */}
                <TouchableOpacity style={styles.createButton} onPress={handleCreateRoom}>
                    <Text style={styles.createButtonText}>Create Room</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default CreateRoomScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 5,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    radioGroup: {
        marginBottom: 20,
    },
    radioButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#3f51b5",
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    radioSelected: {
        backgroundColor: "#3f51b5",
    },
    radioText: {
        fontSize: 16,
        color: "#333",
    },
    createButton: {
        backgroundColor: "#3f51b5",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    createButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
