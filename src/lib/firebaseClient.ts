/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PeQoT Official Firebase Integration & Cloud Persistence Layer
 * Brand: SAS Tech Inc.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInAnonymously
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDocFromServer, 
  Firestore, 
  collection, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  onSnapshot
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { UserProfile, Match, Message, UserLike, VerificationRequest, UserReport } from '../types/peqot';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// CRITICAL: Initialize Firestore with configured database ID
export const db: Firestore = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize anonymous auth session if needed to guarantee authenticated context
if (typeof window !== 'undefined') {
  auth.onAuthStateChanged(user => {
    if (!user) {
      signInAnonymously(auth).catch(err => {
        console.warn('Anonymous auth initialization:', err?.message || err);
      });
    }
  });
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
    },
    operationType,
    path
  };
  console.warn('Firestore Warning: ', JSON.stringify(errInfo));
  return errInfo;
}

// Test Connection on initial boot as required by skill
export async function testFirebaseConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline. Falling back to cached state.');
      return false;
    }
    return true;
  }
}

// --- Firestore CRUD operations for persistent Cloud storage ---

export async function saveProfileToCloud(profile: UserProfile): Promise<boolean> {
  try {
    await setDoc(doc(db, 'profiles', profile.id), profile);
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `profiles/${profile.id}`);
    return false;
  }
}

export async function deleteProfileFromCloud(userId: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'profiles', userId));
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `profiles/${userId}`);
    return false;
  }
}

export async function fetchAllProfilesFromCloud(): Promise<UserProfile[]> {
  try {
    const snap = await getDocs(collection(db, 'profiles'));
    const list: UserProfile[] = [];
    snap.forEach(docSnap => {
      const data = docSnap.data() as UserProfile;
      if (data && data.id && data.display_name) {
        list.push(data);
      }
    });
    return list;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'profiles');
    return [];
  }
}

export async function saveLikeToCloud(like: UserLike): Promise<boolean> {
  try {
    await setDoc(doc(db, 'likes', like.id), like);
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `likes/${like.id}`);
    return false;
  }
}

export async function saveMatchToCloud(match: Match): Promise<boolean> {
  try {
    await setDoc(doc(db, 'matches', match.id), match);
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `matches/${match.id}`);
    return false;
  }
}

export async function fetchAllMatchesFromCloud(): Promise<Match[]> {
  try {
    const snap = await getDocs(collection(db, 'matches'));
    const list: Match[] = [];
    snap.forEach(docSnap => {
      const data = docSnap.data() as Match;
      if (data && data.id) {
        list.push(data);
      }
    });
    return list;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'matches');
    return [];
  }
}

export async function saveMessageToCloud(matchId: string, message: Message): Promise<boolean> {
  try {
    await setDoc(doc(db, 'matches', matchId, 'messages', message.id), message);
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `matches/${matchId}/messages/${message.id}`);
    return false;
  }
}

export async function fetchMessagesFromCloud(matchId: string): Promise<Message[]> {
  try {
    const snap = await getDocs(collection(db, 'matches', matchId, 'messages'));
    const list: Message[] = [];
    snap.forEach(docSnap => {
      const data = docSnap.data() as Message;
      if (data && data.id) {
        list.push(data);
      }
    });
    return list;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, `matches/${matchId}/messages`);
    return [];
  }
}

export async function saveVerificationToCloud(req: VerificationRequest): Promise<boolean> {
  try {
    await setDoc(doc(db, 'verifications', req.id), req);
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `verifications/${req.id}`);
    return false;
  }
}

export async function saveReportToCloud(rep: UserReport): Promise<boolean> {
  try {
    await setDoc(doc(db, 'reports', rep.id), rep);
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `reports/${rep.id}`);
    return false;
  }
}

export function subscribeToProfilesCloud(callback: (profiles: UserProfile[]) => void): () => void {
  try {
    return onSnapshot(collection(db, 'profiles'), snap => {
      const list: UserProfile[] = [];
      snap.forEach(docSnap => {
        const data = docSnap.data() as UserProfile;
        if (data && data.id && data.display_name) {
          list.push(data);
        }
      });
      if (list.length > 0) {
        callback(list);
      }
    }, err => {
      handleFirestoreError(err, OperationType.LIST, 'profiles');
    });
  } catch {
    return () => {};
  }
}

// Initial connection test
testFirebaseConnection();
