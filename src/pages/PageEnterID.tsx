import useClipboard from "react-use-clipboard";

import { Text, MaskedTextField, PrimaryButton, DefaultButton, TeachingBubble } from '@fluentui/react';
import CustomPage from '../components/CustomPage';


export function PageEnterID({ peerjsID, peerjsRemoteID, makeCallToID, setPeerjsRemoteID, setCurrentPage }: { peerjsID: string | null; peerjsRemoteID: string; makeCallToID: Function; setPeerjsRemoteID: React.Dispatch<React.SetStateAction<string>>; setCurrentPage: React.Dispatch<React.SetStateAction<string>>; }): JSX.Element {

  const [isCopied, setCopied] = useClipboard(peerjsID?peerjsID:"", {
    // `isCopied` will go back to `false` after 1000ms.
    successDuration: 1000,
  });

  return <CustomPage>
    <div className="idEnterGrid">
      <div>
        <Text variant="xLarge">ID dieses PCs:</Text>
        <br />
        <Text variant="xxLarge">{peerjsID}</Text>
        <br />
        <br />
        <DefaultButton id="targetButton" onClick={setCopied}>ID Kopieren</DefaultButton>
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
    {isCopied && (
      <TeachingBubble
        target="#targetButton"
        onDismiss={() => { }}
        headline="Kopiert"
      >
      </TeachingBubble>
    )}
  </CustomPage>;
}
