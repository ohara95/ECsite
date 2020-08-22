import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {
  auth,
  createUserProfileDocument,
} from "./components/firebase/firebase.utils";
import "./pages/homepage/homepage.styles.scss";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unSubscribeFromAuth = null;

  componentDidMount() {
    // onAuthStateChangedで現在ログインしているユーザーを取得
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // firebaseに登録
        userRef.onSnapshot((snap) => {
          this.setState(
            {
              currentUser: {
                // idはdataの中にないから別で抽出
                id: snap.id,
                ...snap.data(),
              },
            },
            () => {
              console.log(this.state);
            }
          );
          console.log(this.state);
        });
      }
      // 現在ログインしているユーザーを取得してcurrentUserにセット
      this.setState({
        currentUser: userAuth,
      });
    });
  }

  // ん？
  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
