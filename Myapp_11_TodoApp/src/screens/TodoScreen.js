import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
} from '../redux/todoSlice';

const TodoScreen = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector(state => state.todo);
  const [text, setText] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App (API + Redux)</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Add todo"
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

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={list}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.todoItem}>
              <Text
                style={[
                  styles.todoText,
                  item.completed && styles.completed,
                ]}
                onPress={() => dispatch(toggleTodo(item))}
              >
                {item.title}
              </Text>
              <TouchableOpacity
                onPress={() => dispatch(deleteTodo(item.id))}
              >
                <Text style={styles.delete}>❌</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  inputRow: { flexDirection: 'row', marginBottom: 16 },
  input: { flex: 1, borderWidth: 1, padding: 8, borderRadius: 6 },
  addBtn: { marginLeft: 8, backgroundColor: '#2196F3', padding: 12, borderRadius: 6 },
  btnText: { color: '#fff' },
  todoItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 12 },
  todoText: { fontSize: 16 },
  completed: { textDecorationLine: 'line-through', color: 'gray' },
  delete: { fontSize: 18 },
});
