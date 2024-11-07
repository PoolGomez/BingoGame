import { db } from "@/src/infrastructure/firebase/firebase";

import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";

export class DeleteCollectionUseCase {
    private static readonly COLLECTION_PATH ="numbersBingo";

    async execute(): Promise<void>{
        try {
            const collectionRef = collection(db, DeleteCollectionUseCase.COLLECTION_PATH);
            const q = query(collectionRef);
            const snapshot = await getDocs(q);
            const deletePromises = snapshot.docs.map((document)=>{
                deleteDoc(doc(db, DeleteCollectionUseCase.COLLECTION_PATH, document.id))
                console.log(`documento con id ${document.id} eliminado correctamente`)
            })

            await Promise.all(deletePromises);
            console.log(`Todos los documentos de ${DeleteCollectionUseCase.COLLECTION_PATH} han sido eliminados correctamente.`)
        } catch (error) {
            console.error("Error al eliminar los documentos:", error);
            throw new Error("Failed to delete all documents in the collection.");
        }
    }
}