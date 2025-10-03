import { db } from './firebaseConfig';
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  getDocs,
  addDoc,
  query
} from 'firebase/firestore';

// Coleção no Firestore
const tarefasCollection = collection(db, 'tarefas');

// 🟢 Observar tarefas em tempo real
export function observarTarefas(callback) {
  const q = query(tarefasCollection);
  return onSnapshot(q, (snapshot) => {
    const tarefas = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(tarefas);
  });
}

// 🟢 Finalizar uma tarefa
export async function finalizarTarefa(id) {
  const tarefaRef = doc(db, 'tarefas', id);
  await updateDoc(tarefaRef, { concluida: true });
}

// 🟢 Criar tarefas iniciais (somente se não houver nenhuma)
export async function criarTarefasIniciais(tarefasFixas) {
  const snapshot = await getDocs(tarefasCollection);
  if (snapshot.empty) {
    for (const nome of tarefasFixas) {
      await addDoc(tarefasCollection, {
        titulo: nome,
        status: 'Pendente'
      });
    }
    console.log('✅ Tarefas iniciais criadas.');
  } else {
    console.log('⚠️ Tarefas já existem no banco.');
  }
}
