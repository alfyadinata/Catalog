import { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { QueryClientProvider } from "react-query";
import queryClient from "./queryClient";
import AppRouter from "./AppRouter";
import "./index.css";

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading...</div>}>
          <AppRouter />
        </Suspense>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
