import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from '../components/TodoItem';
import {
  addTodo,
  toggleTodo,
  deleteTodo,
} from '../redux/todoSlice';

const TodoScreen = () => {
  const [task, setTask] = useState('');
  const todos = useSelector(state => state.todo.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (!task.trim()) return;
    dispatch(addTodo(task));
    setTask('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📝 Todo App (Redux)</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter task..."
          value={task}
          onChangeText={setTask}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={handleAddTodo}
        >
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onToggle={(id) => dispatch(toggleTodo(id))}
            onDelete={(id) => dispatch(deleteTodo(id))}
          />
        )}
      />
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
  },
  addBtn: {
    backgroundColor: '#4CAF50',
    marginLeft: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 6,
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
