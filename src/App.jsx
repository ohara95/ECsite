import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {
  auth,
  createUserProfileDocument,
  // addCollectionAndDocuments,
} from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { setCurrentUser } from "./redux/user/user.actions";
import { createStructuredSelector } from "reselect";
// import { selectCollectionsForPreview } from "./redux/shop/shop.selectors";
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
    const { setCurrentUser } = this.props;
    // firebaseにデータ追加できたのでコード消す
    // const { setCurrentUser, collectionArray } = this.props;
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
      // this.setState({
      //   currentUser: userAuth,
      // });
      setCurrentUser(userAuth);
      // addCollectionAndDocuments(
      //   "collections",
      //   // 指定した値を持つオブジェクトのみの配列を返す
      //   // titleとitemsだけフィールドに入る
      //   collectionArray.map(({ title, items }) => ({ title, items }))
      // );
    });
  }

  // ん？
  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionArray: selectCollectionsForPreview,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
