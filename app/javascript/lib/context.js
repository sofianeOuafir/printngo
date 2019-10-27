import createHistory from "history/createBrowserHistory";

export const getContext = () => {
  const history = createHistory();
  const context = history.location.pathname.slice(1).split("/")[0];
  return context;
};