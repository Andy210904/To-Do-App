import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckBox from "expo-checkbox";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const saveTasks = async () => {
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const loadTasks = async () => {
    const saved = await AsyncStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  };

  const addTask = () => {
    if (title === "") {
      Alert.alert("Error", "Title Cannot be Empty");
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      title,
      description: desc,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTitle("");
    setDesc("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (item) => {
    Alert.alert("Task Edit", "Edit the task and add it again");
    setTitle(item.title);
    setDesc(item.description);
    deleteTask(item.id);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>EaseLearn To-Do App</Text>

      <TextInput
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Task Description"
        value={desc}
        onChangeText={setDesc}
        style={styles.input}
      />
      <Button title="Add Task" onPress={addTask} />

      <View style={styles.filterRow}>
        {["All", "Completed", "Pending"].map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={styles.filterBtn}
          >
            <Text style={{ color: filter === f ? "#fff" : "#000" }}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <CheckBox
              value={item.completed}
              onValueChange={() => toggleComplete(item.id)}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.taskTitle,
                  item.completed && { textDecorationLine: "line-through" },
                ]}
              >
                {item.title}
              </Text>
              <Text style={styles.taskDesc}>{item.description}</Text>
            </View>
            <TouchableOpacity
              style={styles.btn_edit}
              onPress={() => editTask(item)}
            >
              <Text style={styles.btnText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn_delete}
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.btnText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40 },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eaeaea",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  taskTitle: { fontWeight: "bold", paddingLeft: 10 },
  taskDesc: { fontSize: 12, color: "#555", paddingLeft: 10 },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  filterBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  btn_delete: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  btn_edit: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
