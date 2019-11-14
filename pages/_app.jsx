import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { useSession } from 'next-session';
import withReduxStore from '../frontend/redux/with-redux-store';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../frontend/static/style/App.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import AppNavbar from '../frontend/components/AppNavbar';

class MyApp extends App {
  static async getInitialProps(appContext) {
    const user = await useSession(appContext.ctx.req, appContext.ctx.res);
    const appProps = await App.getInitialProps(appContext);

    return {
      ...appProps,
      user,
    };
  }

  render() {
    const {
      Component, pageProps, reduxStore, user,
    } = this.props;

    return (
      <Provider store={reduxStore}>
        <div className="App">
          <AppNavbar user={user} />
          <Component {...pageProps} user={user} />
        </div>
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
