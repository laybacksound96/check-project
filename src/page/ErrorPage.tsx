import { isRouteErrorResponse, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";
  if (isRouteErrorResponse(error)) {
    message = error.error?.message || error.statusText;
    if (error.status === 500) {
      message = error.data.message;
    }
    if (error.status === 404) {
      title = "Not found!";
      message = "Could not find resource or page.";
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
      <p>{title}</p>
      <p>{message}</p>
    </>
  );
}

export default ErrorPage;
