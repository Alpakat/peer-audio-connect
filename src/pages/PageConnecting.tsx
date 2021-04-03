import { Text, ProgressIndicator } from '@fluentui/react';
import CustomPage from '../components/CustomPage';

export function PageConnecting() {
  return <CustomPage>
    <div className="maxWidth">
      <Text variant="xxLarge">Verbindung zum anderen PC wird hergestellt.</Text>
      <br />
      <br />
      <ProgressIndicator barHeight={3}></ProgressIndicator>
    </div>
  </CustomPage>;
}
