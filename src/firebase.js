import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAisCQ90yiNmvfXQ_phkppA7rBOFuFd4Ic",
    authDomain: "graffitigraffix-42612.firebaseapp.com",
    projectId: "graffitigraffix-42612"
  };
  firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();

export const signIn = () => {
	return firebase.auth().signInWithPopup(provider);
};

export const signOut = () => {
	return firebase.auth().signOut();
};

export default firebase;
