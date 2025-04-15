import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirebaseConfig } from './firebaseConfig';

const firebaseAdminAuth = () => {
  const firebaseConfig = getFirebaseConfig();

  const firebaseAdmin =
    getApps()[0] ??
    initializeApp({
      credential: cert({
        projectId: firebaseConfig.ProjectId,
        clientEmail: firebaseConfig.ClientEmail,
        privateKey: firebaseConfig.PrivateKey,
      }),
    });

  return getAuth(firebaseAdmin);
};

export { firebaseAdminAuth };
