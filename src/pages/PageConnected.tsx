import { Text } from '@fluentui/react';
import CustomPage from '../components/CustomPage';

export function PageConnected(peerjsID: string | null, peerjsRemoteID: string) {
  return <CustomPage>
    <div className="maxWidth">
      <Text variant="xxLarge">Verbunden.</Text>
    </div>
  </CustomPage>;
}
