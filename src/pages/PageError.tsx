import { Text, DefaultButton } from '@fluentui/react';
import CustomPage from '../components/CustomPage';
import { History } from 'history';

export function PageError(history: History<unknown>) {
  return <CustomPage>
    <div className="maxWidth">
      <Text variant="xxLarge">Ein Fehler ist aufgetreten.</Text>
      <br />
      <br />
      <DefaultButton onClick={() => {
        history.replace('/reload');
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }}>Erneut Versuchen</DefaultButton>
    </div>
  </CustomPage>;
}
