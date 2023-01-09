import './AttractionListItem';
import AttractionListItem from './AttractionListItem';
import GenerateButton from '../GenerateButton';

export default function AttractionList() {

  return (
    <div>
      <GenerateButton>Next step</GenerateButton>

      <AttractionListItem />
      <AttractionListItem />
      <AttractionListItem />
      <AttractionListItem />
      <AttractionListItem />
    </div>

  );
}
