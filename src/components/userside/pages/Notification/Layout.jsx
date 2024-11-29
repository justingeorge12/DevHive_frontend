import SendNotification from "./SendNotification";

function Layout({ children }) {
  return (
    <>
      <SendNotification />
      {children}
    </>
  );
}

export default Layout;
