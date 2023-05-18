import { fetchCheck } from "../../../util/fetch";

export function InsertAccountHandler() {
  return {
    AccountName: "c",
    Characters: [
      {
        CharacterName: "c_1",
        Contents: [
          { ContentName: "c_1_1", value: true, fetch: () => fetchCheck },
          { ContentName: "c_1_2", value: true, fetch: () => fetchCheck },
          { ContentName: "c_1_3", value: true, fetch: () => fetchCheck },
        ],
      },
      {
        CharacterName: "c_2",
        Contents: [
          { ContentName: "c_2_1", value: true, fetch: () => fetchCheck },
          { ContentName: "c_2_2", value: true, fetch: () => fetchCheck },
          { ContentName: "c_2_3", value: true, fetch: () => fetchCheck },
        ],
      },
      {
        CharacterName: "c_3",
        Contents: [
          { ContentName: "c_3_1", value: true, fetch: () => fetchCheck },
          { ContentName: "c_3_2", value: true, fetch: () => fetchCheck },
          { ContentName: "c_3_3", value: true, fetch: () => fetchCheck },
        ],
      },
    ],
  };
}
