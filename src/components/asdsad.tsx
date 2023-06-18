import { atom, useRecoilValue } from "recoil";

interface IColor {
  [colorName: string]: number;
}
const PriceByColor = atom<IColor>({
  key: "PriceByColor",
  default: { red: 1300, blue: 2000, green: 2300, black: 1200 },
});
const ColorArray = ["red", "blue", "green", "black"];

//PatternA=======================================//

const FruitsPatternA = ({ price }: { price: number }) => <div>{price}</div>;
const PatternA = () => {
  const priceByColor = useRecoilValue(PriceByColor);
  return (
    <div>
      {ColorArray.map((color) => {
        const price = priceByColor[`${color}`];
        return <FruitsPatternA price={price} />;
      })}
    </div>
  );
};

//PatternB=======================================//

const FruitsPatternB = ({ color }: { color: string }) => {
  const { [color]: price } = useRecoilValue(PriceByColor);
  return <div>{price}</div>;
};
const PatternB = () => {
  return (
    <div>
      {ColorArray.map((color) => {
        return <FruitsPatternB color={color} />;
      })}
    </div>
  );
};
