import {
  db,
  auth,
  googleProvider,
} from "../config/index";


export const submit = async function({setData}) {
  // logging in with the GOOGLE provider
  const res = await auth.signInWithPopup(googleProvider);

  // console.log('res.user - ', res.user);

  // if (!res.user?.email) {
  //   return setData('not-allowed');
  // }
  //
  // const uid = res.user.uid;
  // const user = await db.collection('users')
  //   .doc(uid).get();
  //
  // console.log('user - ', user);
  //
  // if(!user.exists) return setData('not-allowed');
  //
  // if(user.data().is_instructor) return setData(user.data(), true);
  //
  // return setData('not-allowed');
}
