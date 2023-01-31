import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number
  newTaskTitle: string
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  onEditTask: ({ taskId, newTaskTitle }: EditTaskArgs) => void;
  removeTask: (id: number) => void;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const todoWithSameTitle = tasks.find(task => task.title === newTaskTitle)

    if (todoWithSameTitle) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome.')
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(prevState => [...prevState, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const foundItem = updatedTasks.find(item => item.id === id)

    if (!foundItem) {
      return
    }

    foundItem.done = !foundItem.done
    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover task', 'Tem certeza que você deseja remover a task?', [
      {
        style: 'cancel',
        text: 'Não'
      },
      {
        style: 'destructive',
        onPress: () => {
          const updatedTasks = tasks.filter(task => task.id !== id)
          setTasks(updatedTasks)
        }
      }
    ])
  }

  function handleEditTask({ taskId, newTaskTitle }: EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const taskToBeEdited = updatedTasks.find(task => task.id === taskId)

    if(!taskToBeEdited){
      return
    }

    taskToBeEdited.title = newTaskTitle
    setTasks(updatedTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        onEditTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})