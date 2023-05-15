import { useParams } from "react-router-dom";
interface RouteParams {
  userId: string;
}
function Dashboard(props: any) {
  const { userId } = useParams<RouteParams>();

  return <div>Hello, {userId}</div>;
}

export default Dashboard;
