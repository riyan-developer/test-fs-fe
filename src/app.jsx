import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';

const App = () => {
  useScrollToTop();

  return (
      <Router />
  );
}

export default App;
