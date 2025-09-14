'use client';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  FirestoreError,
} from 'firebase/firestore';
import { db } from './firebase';
import type { MiningSite } from '../types';

const SITES_COLLECTION = 'sites';

export function subscribeToSites(
  onUpdate: (sites: MiningSite[]) => void,
  onError: (error: FirestoreError) => void
) {
  const q = query(collection(db, SITES_COLLECTION), orderBy('name'));

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const sites: MiningSite[] = [];
      querySnapshot.forEach((doc) => {
        sites.push({ id: doc.id, ...doc.data() } as MiningSite);
      });
      onUpdate(sites);
    },
    (error) => {
      console.error('Error fetching sites:', error);
      onError(error);
    }
  );

  return unsubscribe;
}

export async function addSite(site: Omit<MiningSite, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, SITES_COLLECTION), site);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw new Error('Failed to add site.');
  }
}

export async function updateSite(site: MiningSite): Promise<void> {
  if (!site.id) {
    throw new Error('Site ID is required to update.');
  }
  try {
    const { id, ...siteData } = site;
    const siteRef = doc(db, SITES_COLLECTION, id);
    await updateDoc(siteRef, siteData);
  } catch (error) {
    console.error('Error updating document: ', error);
    throw new Error('Failed to update site.');
  }
}

export async function deleteSite(siteId: string): Promise<void> {
  try {
    const siteRef = doc(db, SITES_COLLECTION, siteId);
    await deleteDoc(siteRef);
  } catch (error) {
    console.error('Error deleting document: ', error);
    throw new Error('Failed to delete site.');
  }
}
