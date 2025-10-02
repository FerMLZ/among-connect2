import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(data);
    });
    return () => unsub();
  }, []);

  const handleComplete = async (taskId, completed) => {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, { status: completed ? 'Concluído' : 'Pendente' });

    const audio = new Audio('/complete.mp3');
    audio.play();
  };

  const completedCount = tasks.filter(task => task.status === 'Concluído').length;

  return (
    <div className="container">
      <h1>Connect + 1ª Edição Among</h1>
      <div className="progress">
        <div
          className="bar"
          style={{ width: `${(completedCount / tasks.length) * 100}%` }}
        ></div>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.status === 'Concluído' ? 'done' : ''}>
            <span>{task.name}</span>
            <button onClick={() => handleComplete(task.id, task.status !== 'Concluído')}>
              {task.status === 'Concluído' ? 'Desfazer' : 'Concluir'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
