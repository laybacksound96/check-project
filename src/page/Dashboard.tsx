import { useParams } from "react-router-dom";
import CheckBox from "../components/CheckBox/CheckBox";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CheckBoxContainer,
  Container,
  Contents,
  HeaderBox,
} from "../Style/Dashboard";
import Vertical from "../components/CheckBox/Vertical/Vertical";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  AccountsState,
  CheckboxesState,
  ColumnState,
  ContentsState,
} from "../atoms";
import { useEffect } from "react";

interface RouteParams {
  userId: string;
}

function Dashboard(props: any) {
  const { userId } = useParams<RouteParams>();

  const [contents, setContents] = useRecoilState(ContentsState);
  const columns = useRecoilValue(ColumnState);
  const checkboxes = useRecoilValue(CheckboxesState);
  const accounts = useRecoilValue(AccountsState);
  useEffect(() => {
    // console.log(columns);
    // console.log(accounts);
    // console.log(contents);
    // console.log(checkboxes);

    accounts.map((account) => {
      account.Characters.map((Character) => {
        const constentOfCharacter =
          checkboxes[account.AccountName][Character.CharacterName];
        // for (var elem in constentOfCharacter) {
        //   if (!contents[elem]) {
        //   }
        // }
        return null;
      });
      return null;
    });
  }, [columns, contents, checkboxes, accounts]);
  return (
    <Container>
      <HeaderBox>
        <header>
          <h1>{userId}님의 Sheet</h1>
          <FontAwesomeIcon icon={faGear} size="lg" />
        </header>
        <hr></hr>
        <Contents></Contents>
      </HeaderBox>
      <CheckBoxContainer>
        <Vertical />
        <CheckBox />
      </CheckBoxContainer>
    </Container>
  );
}

export default Dashboard;
