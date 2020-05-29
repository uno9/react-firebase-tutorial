import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import InputForm from './InputForm';
import Item from './Item';

const ItemList = props => {

  // state作成
  const [todoList, setTodoList] = useState(null);

  // firestoreから全データを取得してstateに格納する関数
  // 非同期 async...await
  const getTodosFromFirestore = async () => {
    // firestore から指定のdbを取得
    const itemListArray = await firebase.firestore().collection('todos')
      // チェックボックスがついている(true)か？
      .orderBy('isDone')
      // limitを条件に取得
      .orderBy('limit')
      .get();
    const todoArray = itemListArray.docs.map(x => {
      // データを整形 新しい配列になおす
      return {
        id: x.id,
        data: x.data(),
      }
    })
    setTodoList(todoArray);
    return todoArray;
  }

  // useEffectを利用してFirestoreからデータの一覧を取得．
  useEffect(() => {
    const result = getTodosFromFirestore();
  }, [props])

  return (
    <div>
      {/* 登録されたデータを取得し表示する関数 */}
      <InputForm
        getTodosFromFirestore={getTodosFromFirestore}
      />

      <ul>

        {/* ? データがあれば出力 */}
        {
          todoList?.map((x, index) =>
            //引数に情報のデータを入れ、Item（子コンポーネント）に渡す
            <Item
              key={index}
              todo={x}
              index={index}
              getTodosFromFirestore={getTodosFromFirestore}
          />
            // <li key={index} id={x.id}>
            //  <input type="checkbox" value={x.id} />
            //  <button value={x.id}>delete</button>
            //  <p>締め切り：{x.data.limit.seconds}</p>
            //  <p>やること：{x.data.todo}</p>
            //</li> */}
          )
        }
      </ul>
    </div>
  );
}
export default ItemList;