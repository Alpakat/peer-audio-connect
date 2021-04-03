import { Text, MaskedTextField, PrimaryButton } from '@fluentui/react';
import CustomPage from '../components/CustomPage';

export function PageEnterID(peerjsID: string | null, peerjsRemoteID: string, makeCallToID:Function, setPeerjsRemoteID: React.Dispatch<React.SetStateAction<string>>, setCurrentPage: React.Dispatch<React.SetStateAction<string>>) {
  return <CustomPage>
    <div className="idEnterGrid">
      <div>
        <Text variant="xLarge">ID dieses PCs:</Text>
        <br />
        <Text variant="xxLarge">{peerjsID}</Text>
      </div>
      <div className="maxWidth">
        <div className="inputRow">
          <MaskedTextField value={peerjsRemoteID} onChange={(event, newVal) => { setPeerjsRemoteID(newVal || ""); }} mask="********-****-****-****-************" label="ID des anderen PCs" />
          <PrimaryButton onClick={() => {
            makeCallToID(peerjsRemoteID, setCurrentPage);
          }}>Verbinden</PrimaryButton>
        </div>
      </div>
    </div>
  </CustomPage>;
}
