import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { GlobalStyle } from "../Style/App";
import Footer from "../components/Ui/Footer";
import ErrorComponent from "../components/Errors/ErrorComponent";

function ErrorPage() {
  const error = useRouteError();

  let message = "Something went wrong!";
  if (isRouteErrorResponse(error)) {
    message = error.error?.message || error.statusText;
    if (error.status === 500) {
      message = error.data.message;
    }
    if (error.status === 404) {
      message = "페이지를 찾을 수 없습니다.";
    }
  } else if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    console.error(error);
    message = "Unknown error";
  }

  return (
    <>
      <GlobalStyle />
      <div />
      <ErrorComponent message={message} />
      <Footer />
    </>
  );
}

export default ErrorPage;
