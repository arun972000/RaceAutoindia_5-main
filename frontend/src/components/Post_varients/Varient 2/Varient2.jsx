/* eslint-disable react/prop-types */

import SubcardV2_1 from "./subcard1";
import SubcardV2_2 from "./subcard2";

const Varient2 = ({ item }) => {
  const data1 = item
    .map((item) => <SubcardV2_1 key={item.id} item={item} />)
    .slice(0, 2);
  const data = item
    .map((item) => <SubcardV2_2 key={item.id} item={item} />)
    .slice(2, 6);
  return (
    <>
      {data1}

      {data}
    </>
  );
};

export default Varient2;
