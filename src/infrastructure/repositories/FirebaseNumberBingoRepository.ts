import { NumberBingo } from "@/src/domain/entities/NumberBingo";
import { NumberBingoRepository } from "@/src/domain/repositories/NumberBingoRepository";
import { addDoc, collection, deleteDoc, doc, DocumentData, getDocs, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

export class FirebaseNumberBingoRepository implements NumberBingoRepository{
   

    private collectionRef = collection(db, "numbersBingo");

    async getAll(): Promise<NumberBingo[]> {
        const snapshot = await getDocs(this.collectionRef);
        return snapshot.docs.map((doc)=>({id: doc.id, ...doc.data()} as NumberBingo));
    }

    async create(number: number): Promise<boolean> {
        // const docRef = await addDoc(this.collectionRef, numberBingo);
        const docRef = await addDoc(this.collectionRef, {
            number: number,
            hasComeOut: true,
            createdAt: serverTimestamp(),
        });
        
        if(docRef.id){
            return true;
        }
        return false;
    }

    async delete(number: number): Promise<void> {

        const q = query(this.collectionRef, where ("number","==",number));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (document) =>{
            await deleteDoc(doc(this.collectionRef, document.id));
        })
    }

    subscribeToNumbers(callback: (numbers: NumberBingo[]) => void): () => void {
        const q = query(this.collectionRef, orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q,(snapshot)=>{
            const numbersList: NumberBingo[] = snapshot.docs.map((doc: DocumentData) =>({
                id: doc.id,
                number: doc.data().number,
                hasComeOut: doc.data().hasComeOut,
                createdAt: doc.data().createdAt ? doc.data().createdAt.toDate(): null,
            }));
            callback(numbersList)
        });
        return unsubscribe;
    }

    
}