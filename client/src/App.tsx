import { FC, useState, useEffect } from "react";
import AppRouter from "./components/AppRouter";
import { useActions } from "./hooks/useActions";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";

const App: FC = () => {
  const { setAuthUser } = useActions();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then(data => {
        setAuthUser(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner animation="grow" />;
  }

  return <AppRouter />;
};

export default App;
