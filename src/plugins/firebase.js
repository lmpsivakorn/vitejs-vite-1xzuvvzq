// eslint-disable-next-line no-unused-vars
import { getFunctions, connectFunctionsEmulator } from "firebase/functions"
import { initializeApp, getApps } from "firebase/app"
import { getAuth, initializeRecaptchaConfig } from "firebase/auth"
// import { connectDataConnectEmulator, getDataConnect } from "firebase/data-connect"
// import { connectorConfig } from '@dataconnect/generated'
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyAAXMi9pfGyXw1_PsAKMwz9tHxPMzoFRNY",
  authDomain: "tkt-project-602fe.firebaseapp.com",
  databaseURL: "https://tkt-project-602fe-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tkt-project-602fe",
  storageBucket: "tkt-project-602fe.firebasestorage.app",
  messagingSenderId: "688891548231",
  appId: "1:688891548231:web:1320183c4bb8bed1ffd762",
  measurementId: "G-43RD9FVT41"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
// const dataconnet = getDataConnect(connectorConfig)
// initializeRecaptchaConfig(app, {
//   provider: new ReCaptchaV3Provider('6LfMuyEsAAAAAPhIRTwMnaEmqj4z656k9c2LaLTe'),
//   isTokenAutoRefreshEnabled: true
// })
//
await initializeRecaptchaConfig(auth);

if (!import.meta.env.PROD){
  console.log('connect emulator')
  connectFunctionsEmulator(getFunctions(app), "localhost", 5001)
  // connectDataConnectEmulator(getDataConnect(connectorConfig), 'localhost', 9399)

  // connectAuthEmulator(getAuth(app), "http://127.0.0.1:9099")
}

console.log('firebase init')
// auth.settings.appVerificationDisabledForTesting = false
export const instanceApp = app
export const instanceAuth = auth
// export const instanceDataConnect = dataconnet
