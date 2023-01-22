
import { FirebaseApp } from "../FirebaseConfig";
import * as Firestore from "firebase/firestore";

export interface testDocument {
    numeros: {[nombre: string]: number};
}

/*interface testCollection {
    [uid: string]: testDocument
}*/



// Initialize Firestore
const db = Firestore.getFirestore(FirebaseApp)


const dataPoint = <T>(collectionPath: string) => Firestore.collection(db, collectionPath).withConverter({
    toFirestore: (data: T) => {
        return data as Firestore.DocumentData;
    },
    fromFirestore: (snapshot) => {
        return snapshot.data() as T
    }
})
const database = {
    // list your collections here
    test: dataPoint<testDocument>('test')
}


export const FirestoreService = {
    test: {
        addNumber: (uid: string, field: string, number: number) => {
            const current = database["test"]

            const userDoc = Firestore.doc(current, uid)
            Firestore.getDoc(userDoc).then(doc => {
                if (doc.exists()) {
                    Firestore.updateDoc(userDoc, {
                        numeros: {
                            ...doc.data().numeros,
                            [field]: Firestore.arrayUnion(number)
                        },
                    })
                }
                else {
                    Firestore.setDoc(userDoc, {
                        numeros: {
                            [field]: number
                        }
                    })
                }
            })

        },
        getNumbers: (uid: string, callback: (data: testDocument) => void) => {
            const current = database["test"]


            const unsubscribe = Firestore.onSnapshot(Firestore.doc(current, uid), (doc) => {
                const docData = doc.data()
                if (docData)
                    callback(docData)
            })
            return unsubscribe
        }
    }
}