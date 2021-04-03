import { Text } from '@fluentui/react';
import CustomPage from '../components/CustomPage';

export function PageConnected(peerjsID: string | null, peerjsRemoteID: string) {
  return <CustomPage>
    <div className="maxWidth">
      <Text variant="xLarge">ID dieses PCs:</Text>
      <br />
      <Text variant="xxLarge">{peerjsID}</Text>
      <br />
      <br />
      <Text variant="xxLarge">Verbunden mit {peerjsRemoteID}.</Text>
    </div>
  </CustomPage>;
}
