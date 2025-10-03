import React, { useEffect, useState } from "react";
import "./App.css";
import { collection, updateDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";

export default function App() {
  const [tarefas, setTarefas] = useState([]);

  // Carrega as tarefas do Firestore
  useEffect(() => {
    const tarefasRef = collection(db, "tarefas");
  
    const unsubscribe = onSnapshot(tarefasRef, (snapshot) => {
      const dados = snapshot.docs.map((doc) => ({
        id: doc.id,
        titulo: doc.data().titulo,
        status: doc.data().status,
      }));
      console.log("Tarefas atualizadas:", dados);
      setTarefas(dados);
    });
  
    return () => unsubscribe(); // importante para limpar o listener quando sair da tela
  }, []);
  

  // Alterna o status da tarefa no Firestore
  const toggleConcluida = async (id, statusAtual) => {
    const novaStatus = statusAtual === "Concluído" ? "Pendente" : "Concluído";
    const tarefaRef = doc(db, "tarefas", id);

    await updateDoc(tarefaRef, { status: novaStatus });

    // Atualiza a interface depois da alteração
    setTarefas((prev) =>
      prev.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, status: novaStatus } : tarefa
      )
    );
  };

  const resetarTarefas = async () => {
    for (const tarefa of tarefas) {
      const tarefaRef = doc(db, "tarefas", tarefa.id);
      await updateDoc(tarefaRef, { status: "Pendente" });
    }

    setTarefas((prev) =>
      prev.map((tarefa) => ({ ...tarefa, status: "Pendente" }))
    );
  };

  const total = tarefas.length;
  const concluidasCount = tarefas.filter(t => t.status === "Concluído").length;
  const progresso = total > 0 ? Math.round((concluidasCount / total) * 100) : 0;

  return (
    <div className="container">
      <h1>Connect + 1ª Edição Among</h1>

      <div className="progress-container">
        <p>✔️ {concluidasCount} de {total} tarefas concluídas ({progresso}%)</p>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${progresso}%` }} />
        </div>
      </div>

      <div className="task-grid">
        {tarefas.map((tarefa) => (
          <button
            key={tarefa.id}
            className={`task-button ${tarefa.status === "Concluído" ? "completed" : ""}`}
            onClick={() => toggleConcluida(tarefa.id, tarefa.status)}
          >
            {tarefa.titulo} - {tarefa.status}
          </button>
        ))}
      </div>

      <button className="reset-button" onClick={resetarTarefas}>
        Resetar Tarefas
      </button>
    </div>
  );
}
