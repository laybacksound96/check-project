export function InsertAccountHandler(timestamp: number) {
  return {
    AccountName: `id_${timestamp}`,
    Characters: [
      {
        CharacterName: `id_${timestamp}_1`,
      },
      {
        CharacterName: `id_${timestamp}_2`,
      },
      {
        CharacterName: `id_${timestamp}_3`,
      },
    ],
  };
}
