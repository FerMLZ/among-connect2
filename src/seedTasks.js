// src/seedTasks.js
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const tasks = [
  { id: 1, titulo: 'Organizar as cadeiras em uma área', status: 'pendente' },
  { id: 2, titulo: 'Encontrar o objeto sagrado na cozinha', status: 'pendente' },
  { id: 3, titulo: 'Encontrar o objeto sagrado na salinha', status: 'pendente' },
  { id: 4, titulo: 'Encontrar o objeto sagrado na biblioteca', status: 'pendente' },
  { id: 5, titulo: 'Desenhar o versículo citado no painel', status: 'pendente' },
  { id: 6, titulo: 'Tocar a sequência de rudimento', status: 'pendente' },
  { id: 7, titulo: 'Levar o objeto na colher até o outro lado da igreja', status: 'pendente' },
  { id: 8, titulo: 'Acertar o quiz bíblico', status: 'pendente' },
  { id: 9, titulo: '15 flexões diretas', status: 'pendente' },
  { id: 10, titulo: '40 polichinelos', status: 'pendente' },
  { id: 11, titulo: '20 abdominais', status: 'pendente' },
  { id: 12, titulo: 'Consertar as câmeras', status: 'pendente' },
  { id: 13, titulo: 'Organizar as cadeiras em uma área 2', status: 'pendente' },
  { id: 14, titulo: 'Organizar as cadeiras em uma área 3', status: 'pendente' },
  { id: 15, titulo: 'Quantos livros tem no Velho Testamento?', status: 'pendente' },
  { id: 16, titulo: 'Quantos livros tem no Novo Testamento?', status: 'pendente' },
  { id: 17, titulo: 'Mover a mesa para o lugar correto', status: 'pendente' },
  { id: 18, titulo: 'Cantar o refrão de uma música corretamente', status: 'pendente' },
  { id: 19, titulo: '6 embaixadinhas', status: 'pendente' },
  { id: 20, titulo: 'Citar 1 versículo com a palavra "Salvação"', status: 'pendente' },
];

export const seedTasks = async () => {
  try {
    const tasksCollection = collection(db, "tasks");
    for (const task of tasks) {
      await setDoc(doc(tasksCollection, String(task.id)), task);
    }
    console.log("✅ Tarefas populadas com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao popular tarefas:", error);
  }
};
