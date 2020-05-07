export default function({ store, redirect }) {
  //if user is not authenticated
  if(!store.state.authUser) {
    return redirect('/auth');
  }
}