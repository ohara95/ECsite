import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDxH3s2RTiasb4SSKXACT5pv-mJ5yeSkIc",
  authDomain: "crwn-db-57aa7.firebaseapp.com",
  databaseURL: "https://crwn-db-57aa7.firebaseio.com",
  projectId: "crwn-db-57aa7",
  storageBucket: "crwn-db-57aa7.appspot.com",
  messagingSenderId: "602014151364",
  appId: "1:602014151364:web:01f0f135960d07199ccf91",
};

// ローカルテストを実行する
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // firebaseに追加
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  // userが居てまだsnapshotの中身がなかったら内容を追加
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("err", err.message);
    }
  }
  // 参照を返す
  // データベースが更新されてるかどうか確認のため
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// google認証
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// ライブラリ全体が必要な時に使用
export default firebase;
