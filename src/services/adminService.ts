import { 
  collection, 
  getDocs, 
  query, 
  where, 
  writeBatch, 
  doc, 
  setDoc, 
  serverTimestamp, 
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase/config';
import { BANGALORE_COLLEGES_METADATA, BANGALORE_COLLEGE_DOMAINS, getCollegeName } from '../data/colleges';
import { BOT_SEED_FEEDBACKS } from '../data/expandedBotSeeds';
import { InterviewFeedback, WhitelistedDomain } from '../types';

/**
 * Task #1: Sync / Seed the 50 Bangalore College Domains into Firestore 'whitelisted_domains' collection
 */
export async function syncWhitelistedDomains(): Promise<{ count: number; error?: string }> {
  try {
    const batch = writeBatch(db);
    let count = 0;

    for (const domain of BANGALORE_COLLEGE_DOMAINS) {
      const collegeName = getCollegeName(domain);
      const domainRef = doc(db, 'whitelisted_domains', domain.replace(/[^a-zA-Z0-9.\-_]/g, '_'));
      
      batch.set(domainRef, {
        domain: domain.toLowerCase().trim(),
        collegeName,
        status: 'active',
        addedAt: serverTimestamp()
      }, { merge: true });

      count++;
    }

    await batch.commit();
    console.log(`Successfully synced ${count} whitelisted college domains to Firestore.`);
    return { count };
  } catch (error: any) {
    console.warn('syncWhitelistedDomains warning:', error);
    return { count: 0, error: error.message || 'Failed to sync whitelisted domains' };
  }
}

/**
 * Fetch all dynamic whitelisted domains from Firestore
 */
export async function fetchWhitelistedDomains(): Promise<WhitelistedDomain[]> {
  try {
    const snapshot = await getDocs(collection(db, 'whitelisted_domains'));
    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map(d => {
      const data = d.data();
      return {
        domain: data.domain || d.id,
        collegeName: data.collegeName || getCollegeName(data.domain || d.id),
        status: (data.status === 'disabled' ? 'disabled' : 'active') as 'active' | 'disabled',
        addedAt: data.addedAt
      };
    });
  } catch (error) {
    console.warn('fetchWhitelistedDomains using hardcoded fallback:', error);
    return [];
  }
}

/**
 * Toggle a domain status between 'active' and 'disabled'
 */
export async function toggleDomainStatus(domain: string, newStatus: 'active' | 'disabled'): Promise<boolean> {
  try {
    const docId = domain.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const domainRef = doc(db, 'whitelisted_domains', docId);
    await updateDoc(domainRef, {
      status: newStatus
    });
    return true;
  } catch (error) {
    console.warn('toggleDomainStatus notice:', error);
    return false;
  }
}

/**
 * Add a new custom institutional domain to Firestore
 */
export async function addCustomDomain(domain: string, collegeName: string): Promise<boolean> {
  try {
    const cleanDomain = domain.toLowerCase().trim().replace(/^@/, '');
    const docId = cleanDomain.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const domainRef = doc(db, 'whitelisted_domains', docId);

    await setDoc(domainRef, {
      domain: cleanDomain,
      collegeName: collegeName.trim(),
      status: 'active',
      addedAt: serverTimestamp()
    }, { merge: true });

    return true;
  } catch (error) {
    console.warn('addCustomDomain notice:', error);
    return false;
  }
}

/**
 * Task #4: Seed robust bot feedback dataset across all 105 Bangalore recruiters into Firestore
 */
export async function seedBotFeedbacks(): Promise<{ success: boolean; count: number; error?: string }> {
  try {
    let currentBatch = writeBatch(db);
    let count = 0;
    let opCount = 0;

    for (const item of BOT_SEED_FEEDBACKS) {
      const docRef = doc(db, 'interview_feedback', item.id || `bot-seed-${count}`);
      currentBatch.set(docRef, {
        ...item,
        feedbackType: 'bot',
        submittedAt: serverTimestamp()
      }, { merge: true });

      count++;
      opCount++;

      // Commit every 400 operations to stay well within Firestore's 500-op limit
      if (opCount === 400) {
        await currentBatch.commit();
        currentBatch = writeBatch(db);
        opCount = 0;
      }
    }

    if (opCount > 0) {
      await currentBatch.commit();
    }

    console.log(`Successfully seeded ${count} bot feedback entries into Firestore across all companies.`);
    return { success: true, count };
  } catch (error: any) {
    console.warn('seedBotFeedbacks warning:', error);
    return { success: false, count: 0, error: error.message || 'Failed to seed bot feedbacks' };
  }
}

/**
 * Task #4: Developer Clean-up Utility `purgeBotFeedbacks()`
 * Executes a batch query:
 * `db.collection("interview_feedback").where("feedbackType", "==", "bot").get()` and batch-deletes mock records seamlessly.
 */
export async function purgeBotFeedbacks(): Promise<{ deletedCount: number; error?: string }> {
  try {
    const botQuery = query(
      collection(db, 'interview_feedback'),
      where('feedbackType', '==', 'bot')
    );

    const snapshot = await getDocs(botQuery);
    if (snapshot.empty) {
      return { deletedCount: 0 };
    }

    // Firestore writeBatch has a 500 operations per batch limit
    const batches = [];
    let currentBatch = writeBatch(db);
    let opCount = 0;
    let totalDeleted = 0;

    for (const docSnap of snapshot.docs) {
      currentBatch.delete(docSnap.ref);
      opCount++;
      totalDeleted++;

      if (opCount === 450) {
        batches.push(currentBatch.commit());
        currentBatch = writeBatch(db);
        opCount = 0;
      }
    }

    if (opCount > 0) {
      batches.push(currentBatch.commit());
    }

    await Promise.all(batches);
    console.log(`Successfully purged ${totalDeleted} bot feedback records.`);
    return { deletedCount: totalDeleted };
  } catch (error: any) {
    console.warn('purgeBotFeedbacks notice:', error);
    return { deletedCount: 0, error: error.message || 'Failed to purge bot feedbacks' };
  }
}
