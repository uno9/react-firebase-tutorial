import React, { useState } from 'react';
import firebase from '../firebase';

// 分割代入
const InputForm = ({ getTodosFromFirestore }) => {
  // state作成
  const [todo, setTodo] = useState('');
  const [limit, setLimit] = useState('');

  // Firestoreにデータを送信する関数
  const postDataToFirestore = async (collectionName, postData) => {
    const addedData = await firebase.firestore().collection(collectionName).add(postData);
    return addedData;
  }

  // submitボタンクリック時の処理
  // 空だったら実行しない
  const submitData = async () => {
    // 1行でバリデ終了 何も入力されていなければ出る
    if (todo === '' || limit === '') { return false };
    const postData = {
      todo: todo,
      limit: new Date(limit),
      isDone: false,
    }
    const addedData = await postDataToFirestore('todos', postData);
    setTodo('');
    setLimit('');
    // 関数
    getTodosFromFirestore();
  }

  return (
    <form action="">
      <ul>
        <li>
          {/* タスクのinput */}
          <label htmlFor="todo">やること：</label>
          <input
            type="text"
            id="todo"
            value={todo}
            onChange={e => setTodo(e.target.value)}
          />
        </li>
        <li>
          {/* 日付のinput */}
          <label htmlFor="limit">締め切り：</label>
          <input
            type="datetime-local"
            id="limit"
            value={limit}
            onChange={e => setLimit(e.target.value)}
          />
        </li>
        <li>
          <button
            type="button"
            onClick={submitData}
          >submit</button>
        </li>
      </ul>
    </form>
  )
}

export default InputForm;