// import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from '../redux/todoSlice';

const TodoScreen = () => {
  const [text, setText] = useState('');
  const todos = useSelector(state => state.todo.list);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App (MMKV)</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Enter todo"
        />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            if (text.trim()) {
              dispatch(addTodo(text));
              setText('');
            }
          }}
        >
          <Text style={styles.btnText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text
              style={[
                styles.todoText,
                item.completed && styles.completed,
              ]}
              onPress={() => dispatch(toggleTodo(item.id))}
            >
              {item.text}
            </Text>
            <TouchableOpacity onPress={() => dispatch(deleteTodo(item.id))}>
              <Text style={styles.delete}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  inputRow: { flexDirection: 'row', marginBottom: 16 },
  input: { flex: 1, borderWidth: 1, padding: 8, borderRadius: 6 },
  addBtn: { marginLeft: 8, backgroundColor: '#4CAF50', padding: 12, borderRadius: 6 },
  btnText: { color: '#fff' },
  todoItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 12 },
  todoText: { fontSize: 16 },
  completed: { textDecorationLine: 'line-through', color: 'gray' },
  delete: { fontSize: 18 },
});
