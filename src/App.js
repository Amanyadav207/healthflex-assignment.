import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import CommentsScreen from './components/CommentsScreen';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Comments Section</h1>
        <CommentsScreen />
      </div>
    </Provider>
  );
}

export default App;
