import { db } from "../config/firebase";
import { getDocs,addDoc,doc,updateDoc,deleteDoc, collection,getDoc } from "firebase/firestore";

/**
 * Add a teacher to the database.
 * @param {Object} teacherData - An object containing teacher data.
 * @param {string} teacherData.id - The id of the teacher.
 * @param {string} teacherData.name - The name of the teacher.
 * @param {string} teacherData.password - The password of the teacher.
 * @param {string[]} teacherData.className - The class name associated with the teacher.
 * @param {string[]} teacherData.subjectName - The name of the subject taught by the teacher.
 * @param {string[]} teacherData.subjectId - The unique identifier for the subject taught by the teacher.
 */
export const addTeacherToDatabase = async (teacherData) => {
    const teacherRef = collection(db, "teachers");
    try {
        await addDoc(teacherRef, {
            id: teacherData.id,
            Name: teacherData.name,
            password:teacherData.password,
            classes: teacherData.className,
            sub_names:teacherData.subjectName,
            subject: teacherData.subjectId,
        });
        return { status: true, message: "Document successfully added" };
    } catch (error) {
        console.log(error);
    }
};


export const getTeacherDatabase = async () => {
    const teachersRef = collection(db, "teachers");
    try {
        const querySnapshot = await getDocs(teachersRef);

        const teacherData = [];
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            
            delete data.password;
            
            teacherData.push({
                id: doc.id,
                ...data
            });
        });

        console.log(teacherData);
        return teacherData; // Return the teacherData
    } catch (error) {
        console.error(error);
    }
};


export const updateSubjectInDatabase = async (documentId, updatedTeacherData) => {
    const teachersRef = collection(db, "teachers");
    const teacherDocRef = doc(teachersRef, documentId); // Use Id to reference the specific document

    try {
        await updateDoc(teacherDocRef, updatedTeacherData);
        console.log("Document successfully updated!");
        return { status: true, message: "Document successfully updated" };
    } catch (error) {
        console.error("Error updating document:", error);
        return { status: false, message: "Error updating document" };
    }
};


export const deleteSubject = async (subjectId) => {
    const teachersRef = collection(db, "teachers");
    const teacherDocRef = doc(teachersRef, subjectId);

    try {
        await deleteDoc(teacherDocRef);
        console.log("Document successfully deleted!");
        return { status: true, message: "Document successfully deleted" };
    } catch (error) {
        console.error("Error deleting document:", error);
        return { status: false, message: "Error deleting document" };
    }
};

export const getTeacherFromDatabase = async (DocId) => {
    try {
      const teacherDocRef = doc(db, "teachers", DocId);
      const teacherDocSnapshot = await getDoc(teacherDocRef);
  
      if (teacherDocSnapshot.exists()) {
        return teacherDocSnapshot.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching subject data", error);
      throw error;
    }
  };