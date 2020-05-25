import React, { useContext, useState } from "react";

export const ViewContext = React.createContext({
  view: null,
});

export const ViewProvider = (props) => {
  const viewContext = useContext(ViewContext);

  const [view, setView] = useState(viewContext.view);
  const [lastView, setLastView] = useState();

  const provider = {
    view,
    setView(value) {
      setLastView(view);
      setView(value);
    },
    setGoToLastView() {
      setView(lastView);
    },
  };

  return (
    <ViewContext.Provider value={provider}>
        {props.children}
    </ViewContext.Provider>
  );
};

export default ViewProvider;
