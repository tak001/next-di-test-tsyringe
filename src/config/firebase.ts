import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirebaseConfig } from './firebaseConfig';

export const FirebaseErrorMessages: Record<string, string> = {
  'auth/invalid-credential': 'ログインに失敗しました', // 認証情報が無効な場合
  'auth/user-not-found': 'ログインに失敗しました', // ユーザーが見つからない場合
  'auth/wrong-password': 'ログインに失敗しました', // パスワードが間違っている場合
  'auth/user-disabled': 'アカウントが無効です', // アカウントが無効になっている場合
  'auth/too-many-requests':
    'アカウントが一時的にロックされています\nしばらく経ってから再度お試しください', // 5回以上連続でパスワードを間違えた場合のアカウントロック
} as const;

const firebaseAuth = () => {
  const firebaseConfig = getFirebaseConfig();

  const firebase = initializeApp({
    apiKey: firebaseConfig.ApiKey,
    authDomain: firebaseConfig.AuthDomain,
  });
  const firebaseAuth = getAuth(firebase);
  firebaseAuth.languageCode = 'ja';

  return firebaseAuth;
};

export { firebaseAuth };
