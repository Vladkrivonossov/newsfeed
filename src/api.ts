import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { IPartnerArticle } from './types';

export const initializeApi = (): FirebaseApp => {
  const app = initializeApp({
    apiKey: 'AIzaSyD3EjxhIwsC4ZqEiU-dlKBAWjkYlNYZ9Z0',
    authDomain: 'karpov-news-349ee.firebaseapp.com',
    projectId: 'karpov-news-349ee',
    storageBucket: 'karpov-news-349ee.appspot.com',
    messagingSenderId: '109402941601',
    appId: '1:109402941601:web:2d89135be1611eb72f68e0',
  });

  getAuth(app);
  getFirestore(app);
  getStorage(app);

  return app;
};

const partnersPostsCollection = 'partners-posts';

export const getPartnersArticles = async (): Promise<IPartnerArticle[]> => {
  const db = getFirestore();
  const articles: IPartnerArticle[] = [];

  try {
    const querySnapshot = await getDocs(collection(db, partnersPostsCollection));

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<IPartnerArticle, 'id'>;

      articles.push({
        id: doc.id,
        ...data,
      });
    });
  } catch (error) {
    return Promise.reject(error);
  }

  return articles;
};

export const createPartnerArticle = async (data: Omit<IPartnerArticle, 'id' | 'created'>): Promise<any> => {
  const db = getFirestore();

  try {
    await addDoc(collection(db, partnersPostsCollection), data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updatePartnerArticle = async (id: string, data: Omit<IPartnerArticle, 'id' | 'created'>): Promise<any> => {
  const db = getFirestore();

  const ref = doc(db, partnersPostsCollection, id);

  try {
    await updateDoc(ref, data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deletePartnerArticle = async (id: string): Promise<any> => {
  const db = getFirestore();

  const ref = doc(db, partnersPostsCollection, id);

  try {
    await deleteDoc(ref);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getPartnerArticle = async (id: string): Promise<IPartnerArticle> => {
  const db = getFirestore();

  const docRef = doc(db, partnersPostsCollection, id);
  const docSnap = await getDoc(docRef);

  try {
    if (docSnap.exists()) {
      const data = docSnap.data() as Omit<IPartnerArticle, 'id'>;

      return {
        id: docSnap.id,
        ...data,
      };
    } else {
      throw Error('такой статьи не существует');
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const uploadFile = async (file: File): Promise<string> => {
  const storage = getStorage();
  const storageRef = ref(storage, `${file.name}-${Date.now()}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);

    return url;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getMainPartnerArticle = async (): Promise<IPartnerArticle | null> => {
  const db = getFirestore();
  let article = null;

  try {
    const q = query(collection(db, partnersPostsCollection), orderBy('created', 'desc'), limit(1));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<IPartnerArticle, 'id'>;

      article = {
        id: doc.id,
        ...data,
      };
    });
  } catch (error) {
    return Promise.reject(error);
  }
  return article;
};
